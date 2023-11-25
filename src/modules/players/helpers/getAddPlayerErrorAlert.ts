export const getAddPlayerErrorAlert = (status: number = 400)=> {
    if (status == 409) {
        return "Один из введенных вами значний уже существует"
    }

    return "Ошибка запроса данны"
}