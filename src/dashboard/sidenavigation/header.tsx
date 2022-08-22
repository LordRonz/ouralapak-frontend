const SidenavHeader = () => {
  return (
    <div className='!sticky !top-0 !mb-16 !flex !h-20 !items-center !justify-center !bg-white !text-3xl !text-dark dark:!bg-[#0e141b] dark:!text-white'>
      <img
        alt='Ouralapak logo'
        src='/images/ouralapak_logo_long.png'
        width={180}
        height={38}
        className='inline opacity-100 transition duration-300'
      />
    </div>
  );
};

export default SidenavHeader;
