
import React from 'react';
import { CheckCircleIcon } from './Icons';

const Plan: React.FC<{ title: string; price: string; features: string[]; highlight?: boolean }> = ({ title, price, features, highlight }) => (
    <div className={`p-8 rounded-xl border ${highlight ? 'border-indigo-500 bg-gray-800/50' : 'border-gray-700 bg-gray-800'}`}>
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <p className="mt-2 text-4xl font-extrabold text-white">{price}</p>
        <p className="mt-2 text-gray-400">{title === 'مدى الحياة' ? 'دفعة واحدة' : 'شهرياً'}</p>
        <ul className="mt-8 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className={`w-6 h-6 ${highlight ? 'text-indigo-400' : 'text-green-500'}`} />
                    <span className="text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full mt-10 py-3 px-6 text-lg font-semibold rounded-lg transition-transform duration-200 ${highlight ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
            {highlight ? 'الخطة الحالية' : 'اختر الخطة'}
        </button>
    </div>
);

const Pricing: React.FC = () => {
    return (
        <div className="space-y-8">
            <Plan
                title="الخطة الاحترافية"
                price="$19"
                features={['تعديلات غير محدودة', 'جودة تصدير عالية', 'دعم فني', 'لا إعلانات']}
            />
            <Plan
                title="مدى الحياة"
                price="$99"
                features={['كل مزايا الخطة الاحترافية', 'وصول دائم للتحديثات', 'أولوية في الميزات الجديدة', 'حساب واحد للأبد']}
                highlight
            />
        </div>
    );
};

export default Pricing;
