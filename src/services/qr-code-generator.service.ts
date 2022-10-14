const QRCode = require('qrcode')

export const qrCodeGenerator = async (userUUID: string): Promise<string | null> => {
    try {
        return await QRCode.toDataURL(userUUID);
    } catch (error) {
        console.error('Error While creating the QR Code', error);
        return null;
    }
}