import React, {useEffect, useState} from "react";
import AppHeader from "../components/OtherComponents/AppHeader";
import {Route} from 'react-router-dom'
import MainPage from "./MainPage";
import FaqPage from "./FaqPage";
import AppFooter from "../components/OtherComponents/AppFooter";
import PrivacyAgreement from "./PrivacyAgreemnet";
import PaymentPage from "./PaymentPage";
import ApplicationFormPage from "./ApplicationFormPage";
import ProfilePage from "./ProfilePage";
import AdminPage from "./admin/AdminPage";
import QuestionnaireBlocksPage from "./admin/QuestionnaireBlocksPage";
import AdminProfilePage from "./admin/AdminProfilePage";
import AdminSettingsPage from "./admin/AdminSettingsPage";
import AdminFaqsPage from "./admin/AdminFaqPage";
import WelcomeBlock from "./admin/WelcomeBlock";
import {useHistory} from "react-router-dom";
import MyDocumentsPage from "./MyDocumentsPage";
import MyPaymentsPage from "./MyPaymentsPage";
import ProductionPage from "./admin/ProductionPage";
import ProductionBlocksPage from "./admin/ProductionBlocksPage";
import StrategyFormContainer from "../components/FormConponents/StrategyFormContainer";
import LegalFormContainer from "../components/FormConponents/LegalFormContainer";
import MarketingFormContainer from "../components/FormConponents/MarketingFormContainer";
import FinancialFormContainer from "../components/FormConponents/FinancialFormContainer";
import MobileMenu from "../components/OtherComponents/MobileMenu";
import DocumentsPage from "./admin/DocumentsPage";
import PreviewDocument from "./admin/PreviewDocument";
import PreviewDocumentDetail from "./admin/PreviewDocumentDetail";
import MorePreviewDocument from "./admin/MorePreviewDocument";
import NewDocumentsPage from "./NewDocumentsPage";
import DashboardPage from "./admin/DashboardPage";
import ContentAnketa from "./admin/ContentAnketa";

const AppContainer = ({userData}) => {
    const history = useHistory();

    useEffect(()=>{
        if (userData){
            if (history.location.pathname.includes('/admin') && userData.roles[0].name === 'client'){
                if (userData.payment.payment_status_id == '2'){
                    history.push('/payment')
                }else{
                    history.push('/')
                }
            }
            if (userData.roles[0].name !== "client" && history.location.pathname.includes('/admin')){
                history.push(history.location.pathname);
            }
            if (userData.roles[0].name !== "client" && !history.location.pathname.includes('/admin') ){
                if (
                    userData.roles[0].name === "lawyer" ||
                    userData.roles[0].name === "marketer" ||
                    userData.roles[0].name === "editor" ||
                    userData.roles[0].name === "financier"
                ){
                    history.push('/admin/production')
                }else if (history.location.pathname === '/profile'){
                    history.push('/profile')
                }else {
                    history.push('/admin')
                }
            }
        }
    },[userData]);

    useEffect(()=>{
        if (userData && userData.roles[0].name === 'client'){
            if (userData.payment.payment_status_id == '2'){
                history.push('/payment')
            }
        }
    },[userData]);

    const [isMobileMenuOpen,setMobileMenu] = useState(false);

    return (
        <>
            {userData && (
                <div>
                    {!isMobileMenuOpen ? (
                        <AppHeader
                            userData={userData}
                            setMobileMenu={setMobileMenu}
                        />
                    ):(
                            <MobileMenu
                                setMobileMenu={setMobileMenu}
                            />
                    )}
                    {/*<div className={styles.background_top}></div>*/}
                    {/*<div className={styles.background_bottom}></div>*/}

                        <div style={{minHeight: 'calc(100vh - 182px)'}}>
                            <Route exact path={'/admin/dashboard'} render={()=><DashboardPage/>}/>
                            <Route exact path={'/profile'} render={() => <ProfilePage/>}/>
                            <Route exact path={'/'} render={() => <MainPage userData={userData}/>}/>
                            <Route exact path={'/faq'} render={() => <FaqPage/>}/>
                            <Route exact path={'/privacyAgreement'} render={() => <PrivacyAgreement/>}/>
                            <Route exact path={'/payment'} render={() => <PaymentPage/>}/>
                            <Route path={'/form'} render={() => <ApplicationFormPage/>}/>
                            <Route exact path={'/admin'} render={() => <AdminPage/>}/>
                            <Route exact path={'/admin/documents'} render={()=> <NewDocumentsPage/>}/>
                            <Route exact path={'/admin/questionnaire'} render={() => <ProductionPage/>}/>
                            <Route exact path={'/admin/pre-questionnaire/:id'} render={()=><QuestionnaireBlocksPage/>}/>
                            <Route exact path={'/admin/questionnaire/:id'} render={()=> <ProductionBlocksPage/>}/>
                            <Route exact path={'/admin/questionnaire/strategy/:id'} render={()=><StrategyFormContainer/>}/>
                            <Route exact path={'/admin/questionnaire/legal/:id'} render={()=><LegalFormContainer/>}/>
                            <Route exact path={'/admin/questionnaire/marketing/:id'} render={()=><MarketingFormContainer/>}/>
                            <Route exact path={'/admin/questionnaire/financial/:id'} render={()=><FinancialFormContainer/>}/>
                            <Route exact path={'/admin/production'} render={()=><DocumentsPage/>}/>
                            <Route exact path={'/admin/production/:id'} render={()=><ProductionBlocksPage/>}/>
                            <Route exact path={'/admin/production/strategy/:id'} render={()=><StrategyFormContainer/>}/>
                            <Route exact path={'/admin/production/legal/:id'} render={()=><LegalFormContainer/>}/>
                            <Route exact path={'/admin/production/marketing/:id'} render={()=><MarketingFormContainer/>}/>
                            <Route exact path={'/admin/production/financial/:id'} render={()=><FinancialFormContainer/>}/>
                            <Route exact path={'/admin/profile'} render={()=><AdminProfilePage/>}/>
                            <Route path={'/admin/settings'} render={()=><AdminSettingsPage/>}/>
                            <Route exact path={'/admin/settings/faqs'} render={()=> <AdminFaqsPage/>}/>
                            <Route exact path={'/admin/settings/welcome'} render={()=><WelcomeBlock/>}/>
                            <Route exact path={'/my-documents'} render={()=><MyDocumentsPage/>}/>
                            <Route exact path={'/my-payments'} render={()=><MyPaymentsPage/>}/>
                            <Route exact path={'/finish-document/:id'} render={()=> <PreviewDocument/>}/>
                            <Route exact path={'/success-document/:id'} render={()=> <PreviewDocument/>}/>
                            <Route exact path={'/preview-document/:id'} render={()=> <PreviewDocument/>}/>
                            <Route exact path={'/preview-document/:id/detail/:name'} render={()=><PreviewDocumentDetail/>}/>
                            <Route exact path={'/preview-document/:id/detail/:name/more/:name2'} render={()=><MorePreviewDocument/>}/>
                            <Route exact path={'/content/anketa/:id'} render={()=><ContentAnketa/>}/>
                        </div>
                    <AppFooter/>
                </div>
            )}
        </>
    )
};

export default AppContainer