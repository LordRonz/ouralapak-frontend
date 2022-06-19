import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type CaptchaProps = {
  onChange?: (token: string | null) => void;
};

const Captcha = ({ onChange }: CaptchaProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ReCAPTCHA
      sitekey='6Lcjyn0gAAAAAPaLMst9Q6qvxvC7SXZnv2LdFCKd'
      onChange={onChange}
      theme={(mounted ? theme : 'light') as 'light' | 'dark'}
    />
  );
};

export default Captcha;
