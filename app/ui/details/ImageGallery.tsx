import { JSONObject } from '@/libs/definations';
import { useEffect, useState } from 'react';
import { MdDoubleArrow, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface Image {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string;
}


const WEB_SITE_UNSPLASH_ACCESS_KEY = "QwCkHfh3HcHYIPh2oB1sayI9gyJnw8vlgI3D4A6z-f8"; // process.env.WEB_SITE_UNSPLASH_ACCESS_KEY;

export default function ImageGallery({ category }: { category: JSONObject }) {

    const [images, setImages] = useState<Image[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0); // For sliding effect
    const imagesPerPage = 4;

    const fetchTrendingImages = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${category.name}&client_id=${WEB_SITE_UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();

        setImages(data.results);
    }

    useEffect(() => {
        fetchTrendingImages();
    }, [category]);

    const nextImages = () => {
        if (currentIndex + imagesPerPage < images.length) {
            setTranslateX((prev) => prev - (100 / imagesPerPage));
            setCurrentIndex((prev) => Math.min(prev + imagesPerPage, images.length - imagesPerPage));
        }
    };

    const prevImages = () => {
        if (currentIndex > 0) {
            setTranslateX((prev) => prev + (100 / imagesPerPage));
            setCurrentIndex((prev) => Math.max(prev - imagesPerPage, 0));
        }
    };
    return (
        <div className="flex items-center bg-minty-breeze m-3">
            <button
                onClick={prevImages}
                disabled={currentIndex === 0}
                className={`px-2 h-48 ${(currentIndex === 0) ? "text-gray-400" : "bg-coral-sunset hover:bg-peachy-keen"}`}
            >
               <MdKeyboardDoubleArrowLeft />
            </button>

            <div className="flex overflow-hidden w-full space-x-5 px-4">
                {images.slice(currentIndex, currentIndex + imagesPerPage).map((image) => (
                    <div key={image.id} className="w-1/4">
                        <img
                            src={image.urls.small}
                            alt={image.alt_description}
                            className="w-full h-44 object-cover rounded-lg" // Set height and object-fit
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={nextImages}
                disabled={currentIndex + imagesPerPage >= images.length}
                className={`px-2 h-48 ${(currentIndex + imagesPerPage >= images.length) ? "text-gray-400" : "bg-coral-sunset hover:bg-peachy-keen"}`}
            >
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
}
