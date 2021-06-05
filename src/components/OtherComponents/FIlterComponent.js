import React from 'react';
import styles from '../../assets/styles/FilterComponent.module.css';

const FilterComponent = ({closeFilter}) => {
    return(
        <div className={styles.fake_container}>

            <div className={styles.filter_container}>

                <div id="mySidenav" className={styles.sidenav}>
                    <div className={styles.closenav}>
                        <div className={styles.filter_heading}>
                            Фильтр
                        </div>
                        <a href="javascript:void(0)"
                           className={styles.closebtn}
                           onClick={closeFilter}
                        >&times;</a>
                    </div>

                    <div className={styles.filter_content}>

                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                По статусам разделов
                            </p>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    Пустая
                                </div>
                                <div className={styles.option}>
                                    В работе
                                </div>
                                <div className={styles.option}>
                                    Сохранена
                                </div>
                            </div>
                        </div>

                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                По статусам анкет
                            </p>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    Пустая
                                </div>
                                <div className={styles.option}>
                                    Пустая
                                </div>
                                <div className={styles.option}>
                                    Заполнена
                                </div>
                            </div>
                        </div>

                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                Статусы по комментариям
                            </p>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    Есть
                                </div>
                                <div className={styles.option}>
                                    Нет
                                </div>
                                <div className={styles.option}>
                                    От клиента
                                </div>
                            </div>
                        </div>

                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                Отрасли
                            </p>
                            <div className={styles.options}>
                                <div className={`${styles.option} ${styles.active}`}>
                                    Общепит
                                </div>
                                <div className={styles.option}>
                                    Услуги
                                </div>
                                <div className={`${styles.option} ${styles.active}`}>
                                    Развлечения
                                </div>
                                <div className={styles.option}>
                                    Производство
                                </div>
                                <div className={styles.option}>
                                    Торговля
                                </div>
                                <div className={styles.option}>
                                    Образование
                                </div>
                            </div>
                        </div>

                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                Отрасли
                            </p>
                            <div className={styles.option}>
                                <div className={styles.date}>
                                    <input type="text" value="Очистить"/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter_split}>
                            <p className={styles.option_heading}>
                                Локация
                            </p>
                            <div className={styles.options}>
                                <div className={styles.location}>
                                    <input type="text" value="Очистить"/>
                                </div>
                            </div>
                        </div>


                        <input type="button" className={styles.to_apply} name="" value="Применить"/>
                            <input type="button" className={styles.reset} name="" value="Сбросить параметры"/>

                    </div>


                </div>

                <div
                    id="openNav"
                    className={styles.opennav}
                    // onClick={openNav}
                >&#9776;</div>
            </div>
        </div>
)
};

export default FilterComponent;