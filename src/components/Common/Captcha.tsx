import { useTheme } from 'next-themes';
import { LegacyRef, useEffect, useState } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';

type CaptchaProps = {
  onChange?: (token: string | null) => void;
  ref?: LegacyRef<ReCAPTCHA>;
  show?: boolean;
} & Partial<ReCAPTCHAProps>;

const Captcha = ({
  onChange,
  sitekey = '6Lcjyn0gAAAAAPaLMst9Q6qvxvC7SXZnv2LdFCKd',
  show = true,
  ...rest
}: CaptchaProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {show ? (
        <ReCAPTCHA
          onChange={onChange}
          theme={(mounted ? theme : 'light') as 'light' | 'dark'}
          {...rest}
          sitekey={sitekey}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Captcha;
