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
      }, 2000);
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
  padding: 16px;
  background: red;
`;
