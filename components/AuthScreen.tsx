
import React from 'react';
import Login from './Login';
import Pricing from './Pricing';

const AuthScreen: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-white mb-4">أطلق العنان لإبداعك</h2>
        <p className="text-gray-300 text-lg mb-8">
            قم بتسجيل الدخول للوصول إلى أدوات تحرير الصور المتقدمة المدعومة بالذكاء الاصطناعي. إذا لم يكن لديك حساب، شاهد خططنا واختر ما يناسبك.
        </p>
        <Login />
      </div>
      <div>
        <Pricing />
      </div>
    </div>
  );
};

export default AuthScreen;
