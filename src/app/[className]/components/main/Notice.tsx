'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {ClassEditPost} from '../modal';
import {Dropdown} from '@/src/app/components/_class/dropdown';
import getClassAnnounced from '@/src/api/classBoard/getClassAnnounced';
import DeleteClassBoard from '@/src/api/classBoard/deleteClassBoard';
import User from '@/src/model/User';
import {RoleProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const Notice = ({
  managerRole,
  classId,
  isOpen,
}: RoleProps & {isOpen: boolean}) => {
  const dropdownItems = [
    {
      modalId: '공지사항 수정',
      icon: icons.edit,
      alt: 'Edit Icon',
      text: '수정',
    },
    {
      modalId: '공지사항 삭제',
      icon: icons.delete,
      alt: 'Delete Icon',
      text: '삭제',
    },
  ];
  const [classAnnounced, setClassAnnounced] = useState<
    {ID: number; Title: string; Content: string}[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalId, setSelectedModalId] = useState<string | null>(null);

  const deleteNotice = async (postId: number) => {
    if (classId !== undefined) {
      try {
        if (confirm('정말로 공지사항을 삭제하시겠습니까?')) {
          await DeleteClassBoard(postId, classId, User.uid);
          alert('Notice deleted successfully!');
        }
        const notices = await getClassAnnounced(classId);
        if (Array.isArray(notices.data)) {
          setClassAnnounced(notices.data);
        } else {
          console.error('getClassAnnounced did not return an array');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete notice');
      }
    } else {
      alert('Failed to delete notice');
    }
  };

  const setActiveModalId = (modalId: string) => {
    setSelectedModalId(modalId);
    setIsModalOpen(true);
    if (modalId === '공지사항 삭제') {
      deleteNotice(classAnnounced[0].ID);
    }
  };

  useEffect(() => {
    if (classId !== undefined && isOpen) {
      getClassAnnounced(classId).then(schedules =>
        setClassAnnounced(schedules.data)
      );
    }
  }, [classId, isOpen]);

  return (
    <div className="flex items-center border rounded-lg mt-2 ps-2 h-14">
      {classAnnounced.length > 0 ? (
        <>
          <Image
            className="mx-2"
            src={icons.notice}
            alt={'noticeIcon'}
            width={24}
            height={24}
          />
          <div className="flex w-full justify-between">
            <p className="font-semibold text-lg">
              {classAnnounced[0].Title} : {classAnnounced[0].Content}
            </p>
            {managerRole && (
              <>
                <div style={{width: 30, height: 30}}>
                  <Dropdown
                    dropdownImageSrc={icons.moreVert}
                    items={dropdownItems}
                    setActiveModalId={setActiveModalId}
                    zIndex={10}
                  />
                </div>
              </>
            )}
          </div>
          {isModalOpen && selectedModalId === 'noticeEdit' && <ClassEditPost />}
        </>
      ) : (
        <p className="ms-2 text-xl font-bold">현재 공지사항이 없습니다...</p>
      )}
    </div>
  );
};

export default Notice;
