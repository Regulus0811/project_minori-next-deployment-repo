'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Login} from './components/login';
import intro from '@/public/svgs/intro';
import {useSetRecoilState} from 'recoil';
import userState from '@/src/recoil/atoms/userState';

const Page = () => {
  const setUser = useSetRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    setUser(null);
    localStorage.clear();

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-5xl font-semibold text-center">
        미노리에서, <br /> <p className="mt-4">학습을 더욱 즐겁고 편리하게</p>
      </div>
      <div className="m-4 font-semibold text-gray-500">
        학습의 편의성을 향상시키고 즐겁게 학습하는 경험을 만끽해 보세요!
      </div>
      <div>
        <Image src={intro.introImg} width={500} height={500} alt="mainImg" />
      </div>
      <button
        onClick={openModal}
        className="bg-indigo-600 text-white py-2 px-7 rounded-3xl"
      >
        시작하기
      </button>
      {isOpen && <Login />}
    </main>
  );
};

export default Page;
