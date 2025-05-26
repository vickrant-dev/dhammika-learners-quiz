import { useRouter } from 'next/navigation';
import Image from 'next/image';
import questionsImage from '../../assets/question-image.avif'
import logo from "../../assets/logo.png";

export default function WelcomePage() {

    const router = useRouter();

    const handleClick = () => {
        router.push("/dashboard/barcode");
    };

    return (
        <>
            <div className="flex items-center justify-center logo">
                <Image
                    src={logo || "/placeholder.svg"}
                    alt="logo"
                    width={90}
                    height={90}
                />
            </div>
            <div>
                <title>Home</title>
            </div>
            <div className="h-100 mt-5 flex items-center justify-center bg-white px-4">
                <div
                    onClick={handleClick}
                    className="w-[300px] h-[300px] rounded-xl shadow-md cursor-pointer overflow-hidden transition-all border border-base-content/10 hover:shadow-xl active:scale-95"
                >
                    <div className="h-[75%] bg-gray-200 flex items-center justify-center">
                        {/* Replace this with an actual image if you want */}
                        <span className="text-gray-400">
                            <Image
                                src={questionsImage || "/placeholder.svg"}
                                alt="question_image"
                                width={300}
                                height={300}
                            />
                        </span>
                    </div>
                    <div className="h-[25%] bg-white border-t border-base-content flex items-center justify-center">
                        <h2 className="text-lg font-medium text-gray-800">
                            Question Papers
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );

}