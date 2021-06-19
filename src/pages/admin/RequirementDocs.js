import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/RequirementDocs.module.scss";
import RequirementDocsItem from "../../components/FormConponents/RequirementDocsItem";
import SettingsService from "../../services/SettingsService";

const RequirementDocs = () => {
    const [isPending,setPending] = useState(false);

    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [file3,setFile3] = useState(null);

    const [invoiceForPaymentFile,setInvoiceForPaymentFile] = useState(null);
    const [termsOofAgreementFile,setTermsForAgreementFile] = useState(null);
    const [confidentialityFile,setConfidentialityFile] = useState(null);


    const getDocs = () => {
        setPending(true);
        const response = new SettingsService().getRequirementDocs();
        response.then(res=>{
            console.log(res);
            for (let i=0;i<res.data.length;i++){
                if (res.data[i].type === 'invoice'){
                    setInvoiceForPaymentFile(res.data[i])
                }else if (res.data[i].type === 'agreeScaleUp'){
                    setTermsForAgreementFile(res.data[i])
                }else if (res.data[i].type === 'useScaleUp'){
                    setConfidentialityFile(res.data[i])
                }
            }
            setPending(false)
        }).catch(err=>{
            setPending(false)
        })
    };

    const handleChange = (type,event) => {
        console.log(event.target.files[0]);
        if (type === 'invoice'){
            setFile1(event.target.files[0]);
            updateDoc('invoice')
        }else if (type === 'agreeScaleUp'){
            setFile2(event.target.files[0]);
            updateDoc('agreeScaleUp')
        }else if (type === 'useScaleUp'){
            setFile3(event.target.files[0]);
            updateDoc('useScaleUp')
        }
    };

    const updateDoc = (type) => {
        if (type === 'invoice'){
            const formData = new FormData();
            console.log(file1);
            formData.append('type',type);
            formData.append('file',file1)
            const response = new SettingsService().updateRequirementDocs(formData);
            response.then(res=>{
                console.log(res);
            })
        }else if (type === 'agreeScaleUp'){
            const formData = new FormData();
            formData.append('type',type);
            formData.append('file',file2)
            const response = new SettingsService().updateRequirementDocs(formData);
            response.then(res=>{
                console.log(res)
            })
        }else if (type === 'useScaleUp'){
            const formData = new FormData();
            formData.append('type',type);
            formData.append('file',file3)
            const response = new SettingsService().updateRequirementDocs(formData);
            response.then(res=>{
                console.log(res);
            })
        }
        getDocs();
    };

    useEffect(()=>{
        getDocs();
    },[]);



    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <RequirementDocsItem
                    handleChange={handleChange}
                    updateDoc={updateDoc}
                    isPending={isPending}
                    file={invoiceForPaymentFile}
                    title={"Счет на оплату"}
                />
                <RequirementDocsItem
                    handleChange={handleChange}
                    updateDoc={updateDoc}
                    isPending={isPending}
                    file={termsOofAgreementFile}
                    title={"Условия соглашения"}
                />
                <RequirementDocsItem
                    handleChange={handleChange}
                    updateDoc={updateDoc}
                    isPending={isPending}
                    file={confidentialityFile}
                    title={"Договор о конфиденциальности"}
                />
            </div>
        </div>
    )
};

export default RequirementDocs;