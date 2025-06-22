import type { ToastContentProps } from "react-toastify";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "../Button";
import styles from './styles.module.css';

export default function Dialog({closeToast, data}: ToastContentProps<string>) {
  return(
    <div className={styles.container}>
      <p>{data}</p>
      <div className={styles.buttonsContainer}>
          <Button 
          color="error"  
          title="Cancelar ação e fechar" 
          aria-label="Cancelar ação e fechar" 
          onClick={() => closeToast(false)}
          ><ThumbsDownIcon />
          </Button>
          <Button 
              color="default" 
              title="Confirmar ação e fechar" 
              aria-label="Confirmar ação e fechar" 
              onClick={() => closeToast(true)}
            ><ThumbsUpIcon />
          </Button>
      </div>
    </div>
  );
}