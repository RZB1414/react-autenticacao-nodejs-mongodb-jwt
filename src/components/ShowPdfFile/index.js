import { showFile } from '../../services/files'
import { useEffect, useState } from 'react'
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';
GlobalWorkerOptions.workerSrc = pdfWorker;

const ShowPdfFile = (fileId) => {

    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                // Faz a solicitação para obter o PDF da API
                const response = await showFile(fileId.id) // Altere a URL para corresponder ao endpoint da sua API
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch PDF: ${response.statusText}`);
                }

                // Cria um URL Blob para exibir o PDF
                const pdfBlob = response.data
                const pdfBlobUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfBlobUrl);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPdf();

        // Cleanup: revoga o URL Blob quando o componente desmonta
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [fileId.id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pdfUrl) {
        return <div>Loading PDF...</div>;
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
                <Viewer fileUrl={pdfUrl} />
        </div>
    );
};

export default ShowPdfFile