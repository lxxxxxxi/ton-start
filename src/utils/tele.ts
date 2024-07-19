export const TELE = window.Telegram.WebApp;

export const TELE_INITDATA = TELE.initData;
export const TELE_POPUPPARAMS = TELE.PopupParams;
export const TELE_MAINBUTTON = TELE.MainButton;
export const TELE_BACKBUTTON = TELE.BackButton;
export const TELE_SETTINGSBUTTON = TELE.SettingsButton;

export const useTelegramWebApp = () => {
    const showPopup = (title: string, message: string) => {
        TELE.showPopup({
            title,
            message,
            buttons: [{ type: "close" }],
        });
    };

    const ready = () => {
        TELE.ready();
    };

    const expand = () => {
        TELE.expand();
    };

    const showSettingsButton = () => {
        TELE_SETTINGSBUTTON.show();
    };

    const showBackButton = () => {
        TELE_BACKBUTTON.show();
    };

    const setBackButtonCallback = (callback: () => void) => {
        TELE_BACKBUTTON.onClick(callback);
    };

    const showMainButton = (text: string, clickCallback: () => void) => {
        TELE_MAINBUTTON.setText(text);
        TELE_MAINBUTTON.show();

        TELE_MAINBUTTON.onClick(() => {
            clickCallback();
        });
    };
    const clearMainButton = () => {
        TELE_MAINBUTTON.hide();
    };

    return {
        ready,
        expand,
        showPopup,
        showSettingsButton,
        showBackButton,
        setBackButtonCallback,
        showMainButton,
        clearMainButton,
    };
};

export const getTeleUserName = () => {
    const initdata = TELE_INITDATA;
    // "query_id=AAFaVOxDAgAAAFpU7EMow5w8&user=%7B%22id%22%3A5434528858%2C%22first_name%22%3A%22xixi%22%2C%22last_name%22%3A%22Liu%22%2C%22username%22%3A%22xixiliuooo%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1720684675&hash=22b63c7a3616ac41dc0a44afaaba1a4ace68578dd08eeac9857ec67eb195a09e";
    const params = new URLSearchParams(initdata);
    const user = JSON.parse(params.get("user") || "{}");
    const username = user?.username;
    return username || "";
};
