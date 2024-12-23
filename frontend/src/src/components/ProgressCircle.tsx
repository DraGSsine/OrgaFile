export const ProgressCircle = ({ images, documents, videos } : { images: number, documents: number, videos: number }) => {
    const total = images + documents + videos;
    const imagesRotation = (360 * images) / total;
    const documentsRotation = (360 * documents) / total;
    const videosRotation = (360 * videos) / total;

    return (
        <div className="relative w-28 h-28">
            <svg className="w-full h-full" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="12"
                />
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#ff0000" // Red color
                    strokeWidth="12"
                    strokeDasharray="339.292"
                    strokeDashoffset={339.292 - (339.292 * images) / total}
                    strokeLinecap="round"
                    transform={`rotate(${imagesRotation} 60 60)`}
                />
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#0000ff" // Blue color
                    strokeWidth="12"
                    strokeDasharray="339.292"
                    strokeDashoffset={339.292 - (339.292 * documents) / total}
                    strokeLinecap="round"
                    transform={`rotate(${documentsRotation + imagesRotation} 60 60)`} // Add imagesRotation to documentsRotation
                />
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#ffff00" // Yellow color
                    strokeWidth="12"
                    strokeDasharray="339.292"
                    strokeDashoffset={339.292 - (339.292 * videos) / total}
                    strokeLinecap="round"
                    transform={`rotate(${videosRotation + documentsRotation + imagesRotation} 60 60)`} // Add documentsRotation and imagesRotation to videosRotation
                />
                <circle cx="60" cy="60" r="48" fill="#fff" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">150GB</span>
            </div>
        </div>
    );
};