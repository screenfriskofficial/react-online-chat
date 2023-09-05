import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

// eslint-disable-next-line react/prop-types
export const ChatContextProvider = ({ children }) => {
  // Получаем текущего пользователя из контекста авторизации (предполагается, что AuthContext предоставляет информацию о текущем пользователе).
  const { currentUser } = useContext(AuthContext);

  // Начальное состояние контекста чата.
  const INITIAL_STATE = {
    chatId: "null", // Идентификатор чата, по умолчанию "null".
    user: {}, // Информация о пользователе, по умолчанию пустой объект.
  };

  // Редуктор для управления состоянием контекста чата.
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload, // Устанавливаем нового пользователя в состояние.
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid, // Генерируем уникальный идентификатор чата.
        };
      default:
        return state;
    }
  };

  // Используем хук useReducer для управления состоянием контекста с помощью редуктора.
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // Возвращаем провайдер контекста, который предоставляет данные состояния и функцию dispatch для дочерних компонентов.
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children} {/* Рендерим дочерние компоненты, переданные через props. */}
    </ChatContext.Provider>
  );
};
