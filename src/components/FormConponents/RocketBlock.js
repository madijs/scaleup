import React, {useState} from "react";
import styles from "../../assets/styles/Rocket.module.css";
import {ReactComponent as RocketIcon} from "../../assets/icons/Rocket.svg";
import AnketaService from "../../services/AnketaService";
import {useSelector} from "react-redux";

const RocketBlock = ({setRocketStatus}) => {
    const {userData} = useSelector(state => state.AuthPage);
    const [isClicked, setClick] = useState(false);

    const flyRocket = () => {
        const response = new AnketaService().flyRocket();
        response.then(res=>{
            setClick(true);
            setTimeout(()=>{
                setRocketStatus(1)
            },2000);
        });
        // const response2 = new AnketaService().createFiles(userData.id);
        // response2.then(res=>{
        //     console.log(res);
        // });
    };

    return (
        <div className={styles.space_background}>
            <div className={styles.child_space}>
                <div className={styles.wrapper_for_desc}>
                    <div className={styles.congrats}>
                        Отлично! Все анкеты заполнены
                    </div>
                    <div className={styles.description}>
                        Все анкеты заполнены. Вы можете отправить анкеты и после Вы сможете отслеживать и получать
                        уведомление о статусах
                    </div>
                    <form>
                        <input onClick={flyRocket}
                               className={isClicked ? `${styles.fly_rocket} ${styles.disabled}` : `${styles.fly_rocket} `}
                               type="button"
                               value="Отправить анкеты"/>
                    </form>
                </div>

                <div style={isClicked ? {transform: "translateY(-1000px)"} : {}} className={styles.rocket}>
                    <RocketIcon/>
                </div>
            </div>
        </div>
    )
};
export default RocketBlock;