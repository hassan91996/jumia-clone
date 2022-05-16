import React from 'react'
import Support from './support/support'
import classes from './Footer.module.css'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Payment from '../../assets/Images/payment.png'

const Footer = () => {
    return (
        <>
            <Support />
            <div className={classes.Footer}>
                <div className={classes.container}>
                    <div className={classes.top}>
                        <div>
                            <p>خدمة العملاء</p>
                            <ul>
                                <li><Link to="/">مركز المساعدة</Link></li>
                                <li><Link to="/">اتصل بنا</Link></li>
                                <li><Link to="/">كيفية عمل طلب شراء</Link></li>
                                <li><Link to="/">طرق الدفع</Link></li>
                                <li><Link to="/">سياسة الشحن</Link></li>
                                <li><Link to="/">سياسة الإرجاع و الاسترداد النقدي</Link></li>
                                <li><Link to="/">خدمات الشركات</Link></li>
                                <li><Link to="/">الإبلاغ عن منتج</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p>من نحن</p>
                            <ul>
                                <li><Link to="/">عن جوميا </Link></li>
                                <li><Link to="/">انضم إلى جوميا </Link></li>
                                <li><Link to="/">الشروط والأحكام </Link></li>
                                <li><Link to="/">سياسة الخصوصية  </Link></li>
                                <li><Link to="/">Jumia Express   </Link></li>
                                <li><Link to="/">المتاجر الرسمية   </Link></li>
                                <li><Link to="/">خدمات جوميا للشحن      </Link></li>
                                <li><Link to="/">جوميا بلاك فرايداي       </Link></li>
                            </ul>
                        </div>
                        <div>
                            <p>خدمة العملاء</p>
                            <ul>
                                <li><Link  to="/">بيع على جوميا </Link></li>
                                <li><Link  to="/">كن شريكًا للخدمات اللوجستية </Link></li>
                                <li><Link  to="/">ابدا بزنس مع جوميا (J-Force )</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p>جوميا دولياً</p>
                            <ul>
                                <li><Link  to="/">الجزائر</Link></li>
                                <li><Link  to="/">ساحل العاج</Link></li>
                                <li><Link  to="/">كينيا </Link></li>
                                <li><Link  to="/">المغرب</Link></li>
                                <li><Link  to="/">نيجيريا </Link></li>
                                <li><Link  to="/">السنغال</Link></li>
                                <li><Link  to="/">تونس</Link></li>
                                <li><Link  to="/">أوغندا </Link></li>
                            </ul>
                        </div>

                    </div>
                    <div className={classes.middle}>
                        <div className={classes.social}>
                            <p>تابعونا على :</p>
                            <FacebookIcon className={classes.Icon} />
                            <TwitterIcon className={classes.Icon} />
                            <InstagramIcon className={classes.Icon} />
                            <YouTubeIcon className={classes.Icon} />
                        </div>
                        <div className={classes.Pay}>
                            <p>طرق الدفع</p>
                            <img src={Payment} alt='payment' />
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Footer
