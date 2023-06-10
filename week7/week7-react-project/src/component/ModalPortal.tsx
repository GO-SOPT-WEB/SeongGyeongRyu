import { ReactNode } from "react";
import ReactDom from "react-dom";

interface Props {
  children: ReactNode;
}

//Portal : 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링
//부모컴포넌트와 관계없이 스타일링을 줄 수 있어서 z-index 등으로부터 자유로움
const ModalPortal = ({ children }: Props) => {
  const el = document.getElementById("modal-root") as HTMLElement;
  return ReactDom.createPortal(children, el);
};
export default ModalPortal;
