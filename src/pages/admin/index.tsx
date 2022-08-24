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
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { AiFillDollarCircle } from 'react-icons/ai';
import Select from 'react-select';

import AnimatePage from '@/components/AnimatePage';
import Seo from '@/components/Seo';
import { selectPrimaryTheme } from '@/constant/colors';
import { customSelectStyles } from '@/constant/select';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';
import { statusIklanArray } from '@/lib/getStatusIklan';
import Chart1 from '@/svgs/chart1.svg';
import Chart2 from '@/svgs/chart2.svg';
import Chart3 from '@/svgs/chart3.svg';
import Chart4 from '@/svgs/chart4.svg';

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
  const [mainChartStartDate, setMainChartStartDate] = React.useState(
    new Date()
  );
  const [mainChartEndDate, setMainChartEndDate] = React.useState(new Date());
  const [secondaryChartStartDate, setSecondaryChartStartDate] = React.useState(
    new Date()
  );
  const [secondaryChartEndDate, setSecondaryChartEndDate] = React.useState(
    new Date()
  );

  React.useEffect(() => {
    const ctx = (
      document.getElementById('mainChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, 'rgba(196, 196, 196, 0)');
    gradient.addColorStop(0, '#B49E7C');
    const newData = {
      labels: [
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '00:00',
      ],
      datasets: [
        {
          labels: [
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
            '00:00',
          ],
          data: [
            25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1,
            17.4,
          ],
          backgroundColor: gradient,
          borderColor: '#B49E7C',
          pointRadius: 0,
          fill: true,
        },
      ],
    };
    setChartData(newData);
  }, []);

  const data = {
    labels: [
      '02:00',
      '04:00',
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '00:00',
    ],
    datasets: [
      {
        labels: [
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '00:00',
        ],
        data: [
          25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1,
          17.4,
        ],
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

  const secondaryChartOpts = [statusIklanArray];

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
                className={clsxm('w-fit py-0')}
                options={dashboardsOpts}
                defaultValue={dashboardsOpts[0]}
                theme={selectPrimaryTheme}
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
                        },
                      },
                      plugins: {
                        tooltip: {
                          intersect: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-x-2 rounded-lg bg-white p-4 dark:!bg-neutral-800'>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-5xl text-[#7366FF]' />
                </div>
                <div>
                  <h4 className='m-0'>Today{"'"}s Nett Revenue</h4>
                  <p className='m-0'>Rp. 250.000</p>
                </div>
              </div>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-5xl text-[#F73164]' />
                </div>
                <div>
                  <h4 className='m-0'>Today{"'"}s Nett Revenue</h4>
                  <p className='m-0'>Rp. 250.000</p>
                </div>
              </div>
              <div className='flex w-full items-center justify-center gap-x-3'>
                <div>
                  <AiFillDollarCircle className='text-5xl text-[#7366FF]' />
                </div>
                <div>
                  <h4 className='m-0'>Today{"'"}s Nett Revenue</h4>
                  <p className='m-0'>Rp. 250.000</p>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-12 gap-x-2'>
              <div className='col-span-5 h-fit rounded-lg bg-white py-4 dark:!bg-neutral-800 '>
                <div className='mb-3 flex w-full items-center justify-center'>
                  <h4 className='m-0'>Ad Post By Status</h4>
                </div>
                <div className='grid grid-cols-2 divide-x divide-y'>
                  <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart1 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Dipublikasi</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-x-2 !border-t-0 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart2 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Menunggu Konfirmasi</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart3 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Menunggu Pembayaran Penjual</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart4 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Menunggu Pembayaran Pembeli</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart3 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Terjual</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-x-2 py-4 px-4'>
                    <div className='col-span-5'>
                      <Chart4 />
                    </div>
                    <div className='col-span-7 flex flex-col items-start justify-center gap-y-1'>
                      <h5 className='m-0'>1001</h5>
                      <p className='m-0 text-sm'>Proses Rekber</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-7 flex h-fit flex-col gap-y-5 rounded-lg bg-white p-4 py-4 dark:!bg-neutral-800'>
                <div className='align-center flex items-center justify-between'>
                  <div className='flex flex-col gap-y-2'>
                    <h4 className='m-0'>Ad Post By Statistics</h4>
                    <Select
                      styles={customSelectStyles}
                      className={clsxm('w-fit py-0')}
                      options={secondaryChartOpts[0]}
                      defaultValue={secondaryChartOpts[0][3]}
                      theme={selectPrimaryTheme}
                    />
                  </div>
                  <div className='flex justify-end'>
                    <div className='flex flex-col items-end justify-center gap-y-2'>
                      <div className='flex items-center justify-center gap-x-1'>
                        <p className='m-0 inline whitespace-nowrap text-xs'>
                          Start Date:
                        </p>
                        <DatePicker
                          className='w-28 rounded-lg p-1'
                          selected={secondaryChartStartDate}
                          onChange={(date: Date) =>
                            setSecondaryChartStartDate(date)
                          }
                        />
                      </div>
                      <div className='flex items-center justify-center gap-x-1'>
                        <p className='m-0 inline whitespace-nowrap text-xs'>
                          End Date:
                        </p>
                        <DatePicker
                          className='w-28 rounded-lg p-1'
                          selected={secondaryChartEndDate}
                          onChange={(date: Date) =>
                            setSecondaryChartEndDate(date)
                          }
                        />
                      </div>
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
                        },
                      },
                      plugins: {
                        tooltip: {
                          intersect: false,
                        },
                      },
                    }}
                  />
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
