'use client';

import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { forwardRef } from "react";
import { JSONObject } from "@/libs/definations";
import { IoIosMove, IoIosAlert } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";

interface DraggableCategoryItemProps {
    category: JSONObject;
    index: number;
    moveCategory: (fromIndex: number, toIndex: number) => void;
    itemClick?: (category: JSONObject) => void;
}

const DraggableCategoryItem = forwardRef<HTMLDivElement, DraggableCategoryItemProps>(
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

        return (
            <div
                ref={dragRef}
                className={`flex items-center p-2 border rounded-md space-x-2 ${isDragging ? 'dragging' : 'bg-snow-white'}`} // Apply dragging class
            >
                {/* Drag icon to handle dragging */}
                <div
                    className={`cursor-move p-2 rounded ${isDragging ? 'bg-blue-200' : 'bg-transparent'}`} // Change color when dragging
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsDragging(true);
                    }}
                >
                    <RxDragHandleDots2 />
                </div>

                {/* Category icon and name */}
                {/* {category.icon && <div className="text-2xl">{category.icon}</div>} */}
                <div className="overflow-hidden cursor-pointer hover:text-blue-500" onClick={handleItemClick}>{category.name}</div>
            </div>
        );
    }
);

export default DraggableCategoryItem;






// 'use client';

// import { useEffect, useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { forwardRef } from "react";
// import { JSONObject } from "@/libs/definations";
// import { IoIosMove } from "react-icons/io";


// interface DraggableCategoryItemProps {
//     category: JSONObject;
//     index: number;
//     moveCategory: (fromIndex: number, toIndex: number) => void;
// }

// const DraggableCategoryItem = forwardRef<HTMLDivElement, DraggableCategoryItemProps>(
//     ({ category, index, moveCategory }, ref) => {
//         const dragRef = useRef<HTMLDivElement>(null);

//         const [, drag] = useDrag({
//             type: 'CATEGORY',
//             item: { index },
//         });

//         const [, drop] = useDrop({
//             accept: 'CATEGORY',
//             hover: (item: { index: number }) => {
//                 if (item.index !== index) {
//                     moveCategory(item.index, index);
//                     item.index = index;  // Update the index for further hovers
//                 }
//             },
//         });

//         // Combine refs using the useEffect hook
//         useEffect(() => {
//             if (dragRef.current) {
//                 drag(dragRef.current);
//                 drop(dragRef.current);
//             }
//         }, [drag, drop]);

//         return (
//             <div ref={dragRef} className="flex items-center p-4 bg-gray-100 border rounded-md cursor-move space-x-2">
//                 <IoIosMove />
//                 <div className="text-2xl">{category.icon}</div>
//                 <div className="overflow-hidden">{category.name}</div>
//             </div>
//         );
//     }
// );

// export default DraggableCategoryItem;