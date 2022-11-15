import { useState } from 'react';
import SelcetModal from 'src/components/SelectModal';
import WorkspaceList from 'src/components/WorkspaceList';
import WorkspaceModal from 'src/components/WorkspaceModal';
import { MENU, MENUS, MODAL_MENUS } from 'src/constants/workspace';

import style from './style.module.scss';

function WorkspacePage() {
  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);
  const [clickedMenuId, setClickedMenuId] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const onInput = (value: string) => {
    setInputValue(value);
  };

  const onClickMenu = (id: number) => {
    setClickedMenuId(id);
  };

  const onClickBtn = () => {
    if (clickedMenuId === MENU.CREATE_ID) {
      // 생성 완료 후 로직
      setClickedMenuId(MENU.JOIN_SUCCESS_ID);
      setInputValue('WAB123456'); // TODO: 받아온 참여코드 넣어줄 것
    } else if (clickedMenuId === MENU.JOIN_ID) {
      // 참여 완료 후 로직
    }
  };

  return (
    <div className={style.container}>
      <WorkspaceList onSelectModalOpen={() => setIsOpenSelectModal(true)} />
      {isOpenSelectModal && (
        <SelcetModal
          className={style['select-modal']}
          onClose={() => setIsOpenSelectModal(false)}
        >
          <ul className={style['menu-list']}>
            {MENUS.map(({ id, text }) => (
              <li key={id} onClick={() => onClickMenu(id)}>
                {text}
              </li>
            ))}
          </ul>
        </SelcetModal>
      )}

      {MODAL_MENUS.map(({ id, props: { title, texts, btnText } }) => {
        if (id === clickedMenuId)
          return (
            <WorkspaceModal
              key={id}
              {...{ title, texts, btnText }}
              inputValue={inputValue}
              onChange={onInput}
              onClose={() => setClickedMenuId(0)}
              onClick={onClickBtn}
              isInputDisabled={clickedMenuId === MENU.JOIN_SUCCESS_ID}
            />
          );
      })}
    </div>
  );
}

export default WorkspacePage;
