'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LikeIcon from '@icons/likeIcon.svg';
import { Modal } from '@components/Modal';
import { TextInputField } from '@components/InputFields';
import { CheckBox } from '@components/CheckBox';
import { TextArea } from '@components/TextArea';
import { PillButton } from '@components/PillButton';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form';
import { useCreateFeedback, useRefEffect } from '@/app/_hooks';

import feedbackSchema from '@/lib/validationSchemas/sendFeedbackSchema';
import { cn } from '@/utils/cn';

export default function FeedbackModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdropClick={false} className="bg-primary-200">
      <FeedbackModalContent onClose={onClose} />
    </Modal>
  );
}
function FeedbackModalContent ({onClose}) {
  const onCloseRef = useRefEffect(onClose);

  const [isFormOpen, setFormOpen] = useState(true);
  useEffect(() => {
    if (isFormOpen) return undefined;
    const timer = setTimeout(() => {
      setFormOpen(true);
      onCloseRef.current();
    }, 4000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormOpen]);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackSchema)
  })

  const { mutate: createFeedback } = useCreateFeedback();
  const onSubmit = data => {
    createFeedback(data, {
      onSuccess: () => setFormOpen(false),
    })
  };

  return <div className="px-0 pt-0 md:px-[27px] lg:px-[54px]">
    {isFormOpen ? (
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-10 p-2 lg:gap-y-7">
        <h3 className="text-center text-h4 font-bold lg:text-h3"> Хочете поділитись ідеями?</h3>
        <p className="text-center md:text-p3 lg:text-p2">Залиште свої контактні дані і ми зв’яжемось з Вами</p>
        <div className="flex flex-col gap-14 sm:gap-11 lg:gap-10">
          <TextInputField
            {...register('name')}
            placeholder={`Прізвище та ім'я`}
            error={errors?.name?.message}
            required
            additionalContainerStyle="bg-other-white"
          />
          <TextInputField
            {...register('phone')}
            placeholder="Номер телефону"
            error={errors?.phone?.message}
            required
            additionalContainerStyle="bg-other-white"
          />
        </div>
        <Controller
          control={control}
          name="callMe"
          render={({ field }) => (
            <CheckBox
              checked={field.value ?? false}
              onChange={field.onChange}
              ref={field.ref}
              text="Не телефонувати мені"
            />
          )}
        />
        <TextInputField
          {...register('email')}
          type="email"
          placeholder="Електронна пошта"
          error={errors?.email?.message}
          additionalContainerStyle="bg-other-white"
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              maxLength={320}
              placeholder="Повідомлення"
              required
              error={errors?.message?.message}
            />
          )}
        />
        <PillButton
          type="submit"
          variant="filled"
          colorVariant="blue"
          className="justify-self-end px-6 py-3 text-p3 font-bold text-primary-100"
          aria-label="Click to send feedback data"
        >
              Надіслати
        </PillButton>
      </form>
    ) : (
      <div className="grid justify-items-center">
        <h3 className="pb-6 text-h3 font-bold">Дякую за повідомлення!</h3>
        <p className="text-p2">Наші менеджери незабаром звʼяжуться з Вами</p>
        <LikeIcon
          alt="Thank you image"
          aria-label="Thank you image"
          priority="true"
          className={cn('my-20 h-[217px] w-[217px]')}
        />
      </div>
    )}
  </div>
}

FeedbackModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
}
FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
