import axios from 'axios';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import { getStatusIklanByString, statusIklanArray } from '@/lib/getStatusIklan';
import useAuthHeader from '@/services/authHeader';
import { IklanDetail } from '@/types/iklan';

type IFormInput = {
  status?: number;
};

const IklanAdminEdit = ({ id }: { id: number }) => {
  const { data: iklan } = useSWR<{
    data: IklanDetail;
    message: string;
    success: boolean;
  }>(`${API_URL}/admin/iklan/${id}`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);

  const headers = useAuthHeader();

  const statusIklanOpts = statusIklanArray;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!headers.Authorization) {
      return;
    }
    await toast.promise(
      axios.put(`${API_URL}/admin/iklan/${id}`, data, { headers }),
      {
        pending: {
          render: () => {
            setUpdateBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setUpdateBtnDisabled(false);
            return 'Berhasil update iklan';
          },
        },
        error: {
          render: (e) => {
            setUpdateBtnDisabled(false);
            return (
              (e?.data?.response?.data.message as string) ||
              'Gagal update iklan!'
            );
          },
        },
      }
    );
  };

  if (!iklan) {
    return <Spinner />;
  }

  return (
    <main>
      <section className='art-details-area pb-0'>
        <div className='container'>
          <form
            className='personal-info-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='row'>
              <div className='col-md-4'>
                <div className='single-input-unit'>
                  <label>Status Iklan</label>
                  <Controller
                    control={control}
                    defaultValue={
                      getStatusIklanByString(iklan.data.status as string) ??
                      statusIklanOpts[0].value
                    }
                    name='status'
                    render={({ field: { onChange, value } }) => (
                      <Select
                        className={clsxm('py-3 pt-0')}
                        options={statusIklanOpts}
                        value={statusIklanOpts.find((c) => c.value === value)}
                        onChange={(val) => onChange(val?.value)}
                      />
                    )}
                  />
                </div>
                <p className='text-red-500'>{errors.status?.message}</p>
              </div>
              <div>
                <ButtonGradient
                  disabled={updateBtnDisabled}
                  className='text-black'
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Update Iklan
                </ButtonGradient>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default IklanAdminEdit;
