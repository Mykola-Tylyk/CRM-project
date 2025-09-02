import { useDispatch } from "react-redux";

import { store } from "../stores/store";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
