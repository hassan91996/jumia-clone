import React from 'react'
import classes from './support.module.css'
import Logo from '../../../assets/Images/Logo_black.png'
import Bin from '../../../assets/Images/bin.png'
import EmailIcon from '@mui/icons-material/Email';

const Support = () => {
    return (
        <div className={classes.Support}>
            <div className={classes.Container}>
                <div className={classes.imgContainer}>
                    <img src={Logo} alt="logo" />
                </div>
                <div className={classes.Middle}>
                    <p>هل انت جديد علي جوميا؟</p>
                    <span> اشترك في نشرتنا الاخباريه للحصول علي احدث العروض</span>
                    <div className={classes.Mail} >
                        <div className={classes.InputContainer}>
                            <EmailIcon className={classes.Icon} />
                            <input placeholder='ادخل بريدك الإلكتروني' />
                        </div>
                        <button>اشترك</button>
                    </div>
                </div>
                <div className={classes.AppContainer}>
                    <div>
                        <img src={Bin} alt="bin" />
                    </div>
                    <div>
                        <p>تنزيل تطبيق جوميا المجاني</p>
                        <span> احصل علي العديد من العروض الحصرية</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Support
