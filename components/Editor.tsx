
import React, { useState, useCallback } from 'react';
import { editImageWithGemini, fileToBase64 } from '../services/geminiService';
import Spinner from './Spinner';
import { UploadIcon, SparklesIcon, ExclamationIcon, DownloadIcon, PhotographIcon } from './Icons';

const Editor: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      setGeneratedImageUrl(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImageFile || !prompt) {
      setError('يرجى رفع صورة وكتابة وصف للتعديل.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64Image = await fileToBase64(originalImageFile);
      const resultImageUrl = await editImageWithGemini(base64Image, originalImageFile.type, prompt);
      setGeneratedImageUrl(resultImageUrl);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 flex flex-col gap-6 h-fit">
          <div>
            <label htmlFor="file-upload" className="block text-lg font-semibold mb-3 text-indigo-300">
              1. اختر صورة
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500 px-2">
                    <span>ارفع ملفًا</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                  </label>
                  <p className="pr-1">أو اسحبه وأفلته هنا</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10 ميجابايت</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-lg font-semibold mb-3 text-indigo-300">
              2. صف التعديل المطلوب
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              placeholder="مثال: اجعل السماء بنفسجية وأضف قمرًا كبيرًا"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !originalImageFile || !prompt}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            {isLoading ? <Spinner /> : <SparklesIcon className="w-6 h-6" />}
            <span>{isLoading ? 'جاري المعالجة...' : 'نفذ التعديل'}</span>
          </button>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md flex items-center gap-3">
                <ExclamationIcon className="w-5 h-5"/>
                <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-2">
            <h3 className="text-center font-semibold text-gray-400">الأصلية</h3>
            <div className="aspect-square w-full bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center overflow-hidden">
              {originalImageUrl ? (
                <img src={originalImageUrl} alt="Original" className="object-contain w-full h-full" />
              ) : (
                <div className="text-gray-500 flex flex-col items-center gap-2">
                    <PhotographIcon className="w-16 h-16"/>
                    <span>سيتم عرض صورتك هنا</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-center font-semibold text-gray-400">المعدلة</h3>
            <div className="aspect-square w-full bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
                    <Spinner size="lg" />
                    <p className="text-lg font-semibold text-white">يتم صنع السحر...</p>
                </div>
              )}
              {generatedImageUrl ? (
                <>
                  <img src={generatedImageUrl} alt="Generated" className="object-contain w-full h-full" />
                   <a
                    href={generatedImageUrl}
                    download="edited-image.png"
                    className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-110 shadow-lg z-20"
                    aria-label="تنزيل الصورة المعدلة"
                   >
                     <DownloadIcon className="w-6 h-6" />
                   </a>
                </>
              ) : (
                !isLoading && (
                     <div className="text-gray-500 flex flex-col items-center gap-2 p-4 text-center">
                        <SparklesIcon className="w-16 h-16"/>
                        <span>ستظهر النتيجة هنا بعد التنفيذ</span>
                    </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
