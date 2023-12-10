import styled from "styled-components";
import { useCallback, useMemo, useRef, useState } from "react";

interface ITriggerNotifyComponent {
  text: string;
}

export const useNotifyAlert = () => {
  const [visible, setVisible] = useState(false);
  const valueRef = useRef<string | null>(null);

  const triggerNotifyComponent = useCallback(
    ({ text }: ITriggerNotifyComponent) => {
      setVisible(true);
      valueRef.current = text;
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
    [],
  );

  const notifyComponent = useMemo(() => {
    if (!visible) {
      return null;
    }
    return (
      <Container>
        <p>{valueRef.current ?? "No text"}</p>
      </Container>
    );
  }, [visible]);

  return { triggerNotifyComponent, notifyComponent };
};

const Container = styled.div`
  position: fixed;
  right: 24px;
  top: 24px;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background: #ff5761;
  color: #fff;
  width: fit-content;
  height: 40px;
  z-index: 999;
`;
