import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function BarcodeLogin() {

    const router = useRouter();

    const [barcode, setBarcode] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const myBarcode = '255001998';

    const handleSubmit = () => {

        if (barcode === myBarcode) {
            setErrMsg(null);
            router.push("/dashboard/language?active=true");
            return;
        }
        console.log("Wrong barcode");
        setErrMsg("Incorrect barcode. Try again");

    }

    return (
        <>
            <div className="main-container flex flex-col justify-center h-100 max-w-xs m-auto">
                <div className="heading mb-1">
                    <h2>Enter Your Barcode to Start</h2>
                </div>
                <input type="text" className="input rounded-lg" onChange={(e) => setBarcode(e.target.value)} />
                <div className="err-msg mt-1">
                    <p className="text-sm text-red-500 font-medium">{errMsg ? errMsg : ""}</p>
                </div>
                <button className="btn btn-neutral rounded-lg mt-3 w-full" onClick={handleSubmit}>Start</button>
            </div>
        </>
    )
    
}