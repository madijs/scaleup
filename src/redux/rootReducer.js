import {combineReducers} from "redux";
import {AuthReducer} from "./reducers/AuthReducer";
import {MainReducer} from "./reducers/MainReducer";
import {AdminReducer} from "./reducers/AdminReducer";
import {QuestionnaireReducer} from "./reducers/QuestionnaireReducer";
import {SettingsReducer} from "./reducers/SettingsReducer";
import {ProductionReducer} from "./reducers/ProductionReducer";
import {AnketaReducer} from "./reducers/AnketaReducer";
import {DocumentReducer} from "./reducers/DocumentReducer";


export const rootReducer = combineReducers({
    AuthPage: AuthReducer,
    MainPage: MainReducer,
    AdminPage: AdminReducer,
    QuestionnairePage: QuestionnaireReducer,
    SettingsPage: SettingsReducer,
    ProductionPage: ProductionReducer,
    AnketaPage: AnketaReducer,
    DocumentPage: DocumentReducer
});