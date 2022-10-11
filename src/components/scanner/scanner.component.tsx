import { useState } from "react";
import { useZxing } from "react-zxing";
import './scanner.scss';
export const BarcodeScanner = () => {
    const [result, setResult] = useState("");
    const { ref } = useZxing({
    onResult(result) {
        setResult(result.getText());
        console.log('result', result);
    },
    });

    return (
    <>
        <video className="scanner-video" ref={ref} />
        <p>
            <span>Last result:</span>
            <span>
                {result ? (
                    <>
                        QR Verified
                    </>
                )
                    :(
                    <>
                        Could not ready QR code
                    </>
                )
                }
            </span>
        </p>
    </>
    );
};