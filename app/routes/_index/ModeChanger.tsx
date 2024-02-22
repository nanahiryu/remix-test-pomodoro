import { BaseButton } from "~/components/button";
import { Mode, ModeList } from "~/const/mode";

interface ModeChangerProps {
  mode: Mode;
  changeMode: (mode: Mode) => void;
}

const ModeChanger = (props: ModeChangerProps) => {
  const { mode, changeMode } = props;
  const isActive = (key: Mode) => (mode === key ? "active" : "default");
  return (
    <div className="flex align-center justify-center">
      {ModeList.map((_mode) => (
        <div key={_mode.key} className="mx-2">
          <BaseButton
            bg={isActive(_mode.key)}
            onClick={() => changeMode(_mode.key)}
          >
            {_mode.key}
          </BaseButton>
        </div>
      ))}
    </div>
  );
};

export default ModeChanger;
