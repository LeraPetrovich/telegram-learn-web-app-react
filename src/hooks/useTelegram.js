const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    console.log(tg.initDataUnsafe, tg.initDataUnsafe?.user);
    console.log(tg.MainButton.isVisible);
    if (tg.MainButton.isVisible) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  };
  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
  };
};
