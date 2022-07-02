import { useRouter } from 'next/router';
import * as React from 'react';
import { useClickAway } from 'react-use';

type ToggleContextType = {
  open?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  toggle?: () => void;
};

// create new context
const Context = React.createContext<ToggleContextType>({});

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // set the html tag style overflow to hidden
  // React.useEffect(() => {
  //   document.documentElement.style.overflow = 'hidden';
  // }, []);

  // close side navigation on mobile when route changes. it's triggered when viewport is less than 1024px
  React.useEffect(() => {
    console.log(open);
    if (open && window.innerWidth < 1024) {
      router.events.on('routeChangeStart', () => setOpen(false));
    }
    return () => {
      if (open && window.innerWidth < 1024) {
        router.events.off('routeChangeStart', () => setOpen(false));
      }
    };
  }, [open, router]);

  // close side navigation on click outside when viewport is less than 1024px
  // React.useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (open && window.innerWidth < 1024) {
  //       if (!ref.current?.contains(event.target as HTMLElement)) {
  //         setOpen(false);
  //       }
  //     }
  //   };
  //   window.addEventListener('click', handleOutsideClick);
  //   return () => window.removeEventListener('click', handleOutsideClick);
  // }, [open, ref]);

  useClickAway(ref, () => {
    if (open && window.innerWidth < 1024) {
      setOpen(false);
    }
  });

  return (
    <Context.Provider value={{ open, ref, toggle }}>
      {children}
    </Context.Provider>
  );
};

// custom hook to consume all context values { open, ref, toggle }
export const useToggle = () => {
  return React.useContext(Context);
};

export default DashboardProvider;
