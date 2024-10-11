'use client';

import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { forwardRef } from "react";
import { JSONObject } from "@/libs/definations";
import { IoIosMove, IoIosAlert } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";
import { LiaTrashSolid } from "react-icons/lia";

interface DraggableCategoryItemProps {
    category: JSONObject;
    index: number;
    moveCategory: (fromIndex: number, toIndex: number) => void;
    itemClick?: (category: JSONObject) => void;
}

const CategorySmallBarItem = forwardRef<HTMLDivElement, DraggableCategoryItemProps>(
    ({ category, index, moveCategory, itemClick }, ref) => {
        const dragRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false); // State to track dragging

        const [, drag] = useDrag({
            type: 'CATEGORY',
            item: { index },
            end: (item, monitor) => {
                setIsDragging(false); // Reset dragging state when drag ends
                if (monitor.didDrop()) {
                    // Optionally handle if dropped on a valid drop target
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(), // Collect the dragging state
            }),
        });

        const [, drop] = useDrop({
            accept: 'CATEGORY',
            hover: (item: { index: number }) => {
                if (item.index !== index) {
                    moveCategory(item.index, index);
                    item.index = index;  // Update the index for further hovers
                }
            },
        });

        // Combine refs using the useEffect hook
        useEffect(() => {
            if (dragRef.current) {
                drag(dragRef.current);
                drop(dragRef.current);
            }
        }, [drag, drop]);

        // Function to handle alert
        const handleItemClick = () => {
            if (itemClick) {
                itemClick(category);
            }
        };
        // w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4
        return (
            <div
                ref={dragRef}
                className={`flex items-center border border-gray-300 rounded-md space-x-2 m-1
                         
                         ${isDragging ? 'dragging' : 'bg-snow-white'}`}
                style={{ width: '100px', height: '55px' }} // Fixed width and height
            >
                {/* Drag icon to handle dragging */}
                <div
                    className={`hover:shadow-lg transition cursor-move p-2 rounded h-full ${isDragging ? 'bg-blue-200' : 'bg-transparent'}`} // Change color when dragging
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsDragging(true);
                    }}
                >
                    <RxDragHandleDots2 />
                </div>

                <div className="category-icon-small">
                    <div dangerouslySetInnerHTML={{ __html: category.icon }} />
                </div>

                {/* <div className="overflow-hidden flex-1">{category.name}</div> */}
            </div>
        );
    }
);

export default CategorySmallBarItem;