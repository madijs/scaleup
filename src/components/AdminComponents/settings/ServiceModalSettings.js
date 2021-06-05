import React, {useEffect, useState} from "react";
import styles from "../../../assets/styles/AdminStyles/ServiceModalSettings.module.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../../../assets/icons/check.svg";
import TextField from "@material-ui/core/TextField/TextField";
import SettingsService from "../../../services/SettingsService";
import {getServicesAction} from "../../../redux/actions/settings/getServicesAction";
import {useDispatch} from "react-redux";

const ServiceModalSettings = ({data,closeServiceModal}) => {
    const [form,setForm] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
            const copy = {...form};
            copy.name = data.name;
            copy.price = data.price;
            copy.work = data.work;
            copy.data = data.data;
            setForm(copy);
    },[data]);

    const inputHandleChanged = (event) => {
        const copyForm = {...form};
        copyForm[event.target.name] = event.target.value;
        setForm(copyForm);
    };

    const questionsHandleChanged = (event) => {
        const copyForm = {...form};
        copyForm.data[event.target.name].name = event.target.value;
        setForm(copyForm);
    };

    const subDataQuestionsChanged = (name,index,value) => {
        const copyForm = {...form};
        copyForm.data[name].sub_data[index] = value;
        setForm(copyForm)
    };

     const updateService = () => {
        const response = new SettingsService().updateServiceAPI(data.id,form);
         response.then(res=>{
             closeServiceModal();
             dispatch(getServicesAction());
         })
     };

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_content_title}>Редактирование</div>
                    <div onClick={closeServiceModal} className={styles.close}></div>
                </div>
            </div>
            <div className={styles.content}>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            label="Тип тарифа"
                            name="name"
                            variant="outlined"
                            value={form.name}
                            onChange={inputHandleChanged.bind(this)}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            label="Стоимость"
                            name="price"
                            variant="outlined"
                            value={form.price}
                            onChange={inputHandleChanged.bind(this)}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            label="Кол. рабочих дней"
                            name="work"
                            variant="outlined"
                            value={form.work}
                            onChange={inputHandleChanged.bind(this)}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                {data.id === 1 && (
                    <>
                        <div className={styles.title}>
                            Преимущества
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-1"
                            variant="outlined"
                            value={form.data ? form.data['data-1'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-2"
                            variant="outlined"
                            value={form.data ? form.data['data-2'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-3"
                            variant="outlined"
                            value={form.data ? form.data['data-3'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-3'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-3'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-4"
                            variant="outlined"
                            value={form.data ? form.data['data-4'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-4'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-4'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-5"
                            variant="outlined"
                            value={form.data ? form.data['data-5'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-6"
                            variant="outlined"
                            value={form.data ? form.data['data-6'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}
                {data.id === 2 && (
                    <>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-1"
                            variant="outlined"
                            value={form.data ? form.data['data-1'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-2"
                            variant="outlined"
                            value={form.data ? form.data['data-2'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-3"
                            variant="outlined"
                            value={form.data ? form.data['data-3'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-4"
                            variant="outlined"
                            value={form.data ? form.data['data-4'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-5"
                            variant="outlined"
                            value={form.data ? form.data['data-5'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-6"
                            variant="outlined"
                            value={form.data ? form.data['data-6'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-6'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-6'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-7"
                            variant="outlined"
                            value={form.data ? form.data['data-7'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-7'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-7'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-8"
                            variant="outlined"
                            value={form.data ? form.data['data-8'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-8'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-8'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-9"
                            variant="outlined"
                            value={form.data ? form.data['data-9'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-10"
                            variant="outlined"
                            value={form.data ? form.data['data-10'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-11"
                            variant="outlined"
                            value={form.data ? form.data['data-11'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-12"
                            variant="outlined"
                            value={form.data ? form.data['data-12'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-13"
                            variant="outlined"
                            value={form.data ? form.data['data-13'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-14"
                            variant="outlined"
                            value={form.data ? form.data['data-14'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-15"
                            variant="outlined"
                            value={form.data ? form.data['data-15'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-16"
                            variant="outlined"
                            value={form.data ? form.data['data-16'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-17"
                            variant="outlined"
                            value={form.data ? form.data['data-17'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}
                {data.id === 3 && (
                    <>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-1"
                            variant="outlined"
                            value={form.data ? form.data['data-1'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-2"
                            variant="outlined"
                            value={form.data ? form.data['data-2'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-3"
                            variant="outlined"
                            value={form.data ? form.data['data-3'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-4"
                            variant="outlined"
                            value={form.data ? form.data['data-4'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-4'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-4'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-5"
                            variant="outlined"
                            value={form.data ? form.data['data-5'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={styles.sub_data}>
                            {form.data && form.data['data-5'].sub_data.map((el,index)=>(
                                <TextField
                                    key={index}
                                    className={`${styles.subTextField} on`}
                                    id="outlined-basic"
                                    name={'data-5'}
                                    variant="outlined"
                                    value={el}
                                    onChange={(e)=>subDataQuestionsChanged(e.target.name,index,e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img src={Check} alt=""/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-6"
                            variant="outlined"
                            value={form.data ? form.data['data-6'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-7"
                            variant="outlined"
                            value={form.data ? form.data['data-7'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-8"
                            variant="outlined"
                            value={form.data ? form.data['data-8'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-9"
                            variant="outlined"
                            value={form.data ? form.data['data-9'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={`${styles.textField} on`}
                            id="outlined-basic"
                            name="data-10"
                            variant="outlined"
                            value={form.data ? form.data['data-10'].name : ""}
                            onChange={questionsHandleChanged.bind(this)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={Check} alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}
                <div className={styles.footer}>
                    <div onClick={updateService} className={styles.add_btn}>Сохранить</div>
                    <div onClick={closeServiceModal} className={styles.cancel_btn}>Отмена</div>
                </div>
            </div>
        </div>
    )
};
export default ServiceModalSettings;