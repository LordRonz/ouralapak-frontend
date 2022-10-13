import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { sub } from 'date-fns';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { AiFillDollarCircle } from 'react-icons/ai';
import Select from 'react-select';
import useSWR from 'swr';

import AnimatePage from '@/components/AnimatePage';
import Seo from '@/components/Seo';
import { selectPrimaryTheme } from '@/constant/colors';
import { API_URL } from '@/constant/config';
import { customSelectStyles } from '@/constant/select';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';
import formatDateStrId from '@/lib/formatDateStrId';
import getEpochSecond from '@/lib/getEpochSecond';
import { StatusIklanEnum } from '@/lib/getStatusIklan';
import toIDRCurrency from '@/lib/toIDRCurrency';
import Chart1 from '@/svgs/chart1.svg';
import Chart2 from '@/svgs/chart2.svg';
import Chart3 from '@/svgs/chart3.svg';
import Chart4 from '@/svgs/chart4.svg';
import { StatusInvoice } from '@/types/invoice';
import APIResponse from '@/types/response';
import Revenue from '@/types/revenue';
import TotalData from '@/types/totalData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const IndexPage = () => {
  const [chartData, setChartData] =
    React.useState<ChartData<'line', number[], string>>();

  const [activeChart, setActiveChart] = React.useState(0);
  const [dashboardType, setDashboardType] = React.useState(0);
  const [mainChartStartDate, setMainChartStartDate] = React.useState(
    sub(new Date(), { days: 30 })
  );
  const [mainChartEndDate, setMainChartEndDate] = React.useState(new Date());

  const { data: mainChart } = useSWR<APIResponse<Revenue>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${
        ['iklan', 'rekber'][dashboardType]
      }-revenue/${['net', 'gross', 'admin-fee'][activeChart]}`,
      query: {
        start_date: getEpochSecond(mainChartStartDate),
        end_date: getEpochSecond(mainChartEndDate),
      },
    })
  );

  const { data: accumulatedNetRevenue } = useSWR<APIResponse<Revenue>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${
        ['iklan', 'rekber'][dashboardType]
      }-revenue/net`,
      query: {
        start_date: getEpochSecond(mainChartStartDate),
        end_date: getEpochSecond(mainChartEndDate),
      },
    })
  );

  const { data: accumulatedGrossRevenue } = useSWR<APIResponse<Revenue>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${
        ['iklan', 'rekber'][dashboardType]
      }-revenue/gross`,
      query: {
        start_date: getEpochSecond(mainChartStartDate),
        end_date: getEpochSecond(mainChartEndDate),
      },
    })
  );

  const { data: accumulatedAdminFeeRevenue } = useSWR<APIResponse<Revenue>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${
        ['iklan', 'rekber'][dashboardType]
      }-revenue/admin-fee`,
      query: {
        start_date: getEpochSecond(mainChartStartDate),
        end_date: getEpochSecond(mainChartEndDate),
      },
    })
  );

  const { data: totalDipublikasi } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.DIPUBLIKASI,
      },
    })
  );

  const { data: totalMenungguKonfirmasi } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.MENUNGGU_KONFIRMASI,
      },
    })
  );

  const { data: totalMenungguPembayaranPenjual } = useSWR<
    APIResponse<TotalData>
  >(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.MENUNGGU_PEMBAYARAN,
      },
    })
  );

  const { data: totalMenungguPembayaranPembeli } = useSWR<
    APIResponse<TotalData>
  >(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI,
      },
    })
  );

  const { data: totalTerjual } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.SELESAI,
      },
    })
  );

  const { data: totalProsesRekber } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusIklanEnum.PROSES_REKBER,
      },
    })
  );

  const { data: totalMenungguPembayaran } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusInvoice.MENUNGGU_PEMBAYARAN,
      },
    })
  );

  const { data: totalSudahDibayar } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusInvoice.SUDAH_DIBAYAR,
      },
    })
  );

  const { data: totalExpired } = useSWR<APIResponse<TotalData>>(
    stringifyUrl({
      url: `${API_URL}/admin/statistik/${['iklan', 'rekber'][dashboardType]}`,
      query: {
        status: StatusInvoice.EXPIRED,
      },
    })
  );

  React.useEffect(() => {
    const ctx = (
      document.getElementById('mainChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (!ctx || !mainChart?.data) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, 'rgba(196, 196, 196, 0)');
    gradient.addColorStop(0, '#B49E7C');
    const labels = mainChart.data.val.map((v) =>
      formatDateStrId(v.date, 'dd/MM/yy')
    );
    const data = mainChart.data.val.map(({ value }) => value);
    const newData = {
      labels,
      datasets: [
        {
          labels,
          data,
          backgroundColor: gradient,
          borderColor: '#B49E7C',
          pointRadius: 0,
          fill: true,
        },
      ],
    };
    setChartData(newData);
  }, [mainChart, mainChart?.data]);

  const data = {
    labels: ['02:00', '04:00'],
    datasets: [
      {
        labels: ['02:00', '04:00'],
        data: [25.0, 32.4],
        lineTension: 0.4,
        backgroundColor: 'rgba(250,174,50,0.5)',
        borderColor: '#ff6c23',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff6c23',
        pointHighlightFill: '#fff',
        pointHighlightStroke: '#ff6c23',
      },
    ],
  };

  const dashboardsOpts = [
    {
      label: 'Posting Iklan',
      value: 0,
    },
    {
      label: 'Rekber',
      value: 1,
    },
  ];

  return (
    <>
      <Seo templateTitle='Admin | Iklan' />
      <AnimatePage>
        <DashboardLayout>
          <div className='mb-4'>
            <div className='flex items-center gap-x-8'>
              <h1 className='m-0 text-2xl'>Dashboards</h1>
              <Select
                styles={customSelectStyles}
                className={clsxm('w-44 py-0')}
                options={dashboardsOpts}
                defaultValue={dashboardsOpts[0]}
                theme={selectPrimaryTheme}
                onChange={(v) => setDashboardType(v?.value ?? 0)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-4'>
            <div className='grid grid-cols-4 gap-x-2 divide-x-2 rounded-lg bg-white p-4 dark:!bg-neutral-800'>
              <div>
                <h2 className='text-xl'>Revenue statistics</h2>
                <div>
                  <div
                    className={clsxm(
                      'flex cursor-pointer flex-col gap-y-1 p-3',
                      activeChart === 0 && 'activeChart'
                    )}
                    onClick={() => setActiveChart(0)}
                  >
                    <h3 className='m-0 text-base'>Nett Revenue</h3>
                    <p className='m-0 text-sm text-neutral-500'>
                      Shows total nett ad post revenue (no admin fees)
                    </p>
                  </div>
                  <div
                    className={clsxm(
                      'flex cursor-pointer flex-col gap-y-1 p-3',
                      activeChart === 1 && 'activeChart'
                    )}
                    onClick={() => setActiveChart(1)}
                  >
                    <h3 className='m-0 text-base'>Gross Revenue</h3>
                    <p className='m-0 text-sm text-neutral-500'>
                      Shows total gross ad post revenue (package fee + admin
                      fee)
                    </p>
                  </div>
                  <div
                    className={clsxm(
                      'flex cursor-pointer flex-col gap-y-1 p-3',
                      activeChart === 2 && 'activeChart'
                    )}
                    onClick={() => setActiveChart(2)}
                  >
                    <h3 className='m-0 text-base'>Admin Fee Revenue</h3>
                    <p className='m-0 text-sm text-neutral-500'>
                      Displays total ad post admin fee revenue
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-3 flex flex-col pl-2'>
                <div className='flex justify-end'>
                  <div className='flex items-center justify-center gap-x-4'>
                    <div className='flex items-center justify-center gap-x-1'>
                      <p className='m-0 inline whitespace-nowrap text-xs'>
                        Start Date:
                      </p>
                      <DatePicker
                        className='w-28 rounded-lg p-1'
                        selected={mainChartStartDate}
                        onChange={(date: Date) => setMainChartStartDate(date)}
                        dateFormat='dd/MM/yyyy'
                      />
                    </div>
                    <div className='flex items-center justify-center gap-x-1'>
                      <p className='m-0 inline whitespace-nowrap text-xs'>
                        End Date:
                      </p>
                      <DatePicker
                        className='w-28 rounded-lg p-1'
                        selected={mainChartEndDate}
                        onChange={(date: Date) => setMainChartEndDate(date)}
                        dateFormat='dd/MM/yyyy'
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Line
                    id='mainChart'
                    data={chartData ?? data}
                    options={{
                      scales: {
                        x: {
                          grid: {
                            color: 'rgba(0, 0, 0, 0)',
                          },
                        },
                        y: {
                          grid: {
                            color: 'rgba(0, 0, 0, 0)',
                          },
                          beginAtZero: true,
                          ticks: {
                            callback: function (value) {
                              return 'Rp ' + value;
                            },
                          },
                          ...(chartData && {
                            max: Math.round(
                              Math.max(...chartData.datasets[0].data) * 1.5
                            ),
                          }),
                        },
                      },
                      plugins: {
                        tooltip: {
                          intersect: false,
                          callbacks: {
                            label: function (context) {
                              let label = context.dataset.label || '';

                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                })
                                  .format(context.parsed.y)
                                  .slice(0, -3);
                              }
                              return label;
                            },
                          },
                        },
                        legend: { display: false },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-x-2 rounded-lg bg-white p-4 dark:!bg-neutral-800'>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-4xl text-[#7366FF]' />
                </div>
                <div>
                  <h4 className='m-0 text-base'>Accumulated Nett Revenue</h4>
                  <p className='m-0'>
                    {toIDRCurrency(accumulatedNetRevenue?.data?.total_revenue)}
                  </p>
                </div>
              </div>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-4xl text-[#F73164]' />
                </div>
                <div>
                  <h4 className='m-0 text-base'>Accumulated Gross Revenue</h4>
                  <p className='m-0'>
                    {toIDRCurrency(
                      accumulatedGrossRevenue?.data?.total_revenue
                    )}
                  </p>
                </div>
              </div>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-4xl text-[#7366FF]' />
                </div>
                <div>
                  <h4 className='m-0 text-base'>
                    Accumulated Admin Fee Revenue
                  </h4>
                  <p className='m-0'>
                    {toIDRCurrency(
                      accumulatedAdminFeeRevenue?.data?.total_revenue
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className='grid gap-x-2'>
              <div className='h-fit rounded-lg bg-white py-4 dark:!bg-neutral-800 '>
                <div className='mb-4 flex w-full items-center justify-center'>
                  <h4 className='m-0'>{`Total ${
                    ['Iklan', 'Rekber'][dashboardType]
                  }`}</h4>
                </div>
                <div className='grid grid-cols-2 divide-x divide-y'>
                  {dashboardType === 0 ? (
                    <>
                      <div className='grid grid-cols-12 items-center justify-center gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart1 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalDipublikasi?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>Dipublikasi</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 gap-x-2 !border-t-0 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart2 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalMenungguKonfirmasi?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>Menunggu Konfirmasi</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart3 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalMenungguPembayaranPenjual?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>
                            Menunggu Pembayaran Penjual
                          </p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart4 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalMenungguPembayaranPembeli?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>
                            Menunggu Pembayaran Pembeli
                          </p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart3 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>{totalTerjual?.data?.total}</h5>
                          <p className='m-0 text-sm'>Terjual</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart4 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalProsesRekber?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>Proses Rekber</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='grid grid-cols-12 items-center justify-center gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart1 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalMenungguPembayaran?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>Menunggu Pembayaran</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 items-center justify-center gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart2 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>
                            {totalSudahDibayar?.data?.total}
                          </h5>
                          <p className='m-0 text-sm'>Sudah Dibayar</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-12 items-center justify-center gap-x-2 py-4 px-4'>
                        <div className='col-span-5'>
                          <Chart3 />
                        </div>
                        <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                          <h5 className='m-0'>{totalExpired?.data?.total}</h5>
                          <p className='m-0 text-sm'>Expired</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </AnimatePage>
      <style jsx>{`
        .activeChart {
          background: linear-gradient(270deg, #b49e7c 1.42%, #ded3c4 99.06%);
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
