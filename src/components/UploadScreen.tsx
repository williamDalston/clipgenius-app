import React, { useState } from 'react';
import UploadForm from './UploadForm';
import ProcessingScreen from './ProcessingScreen';

const UploadScreen: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (f: File) => {
    setFile(f);
    setProcessing(true);

    // Simulate async upload & processing
    setTimeout(() => {
      alert('Upload complete: ' + f.name);
      setProcessing(false);
    }, 3000);
  };

  if (processing) return <ProcessingScreen />;

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Upload your clip</h1>
      <UploadForm onUpload={handleUpload} />
    </div>
  );
};

export default UploadScreen;
