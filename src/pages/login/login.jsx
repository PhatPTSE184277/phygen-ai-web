import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import './login.scss';
import Bg from '../../img/Bg1.png';
import Item from '../../img/Picture.png';
import FB from '../../img/FBook.png';
import GG from '../../img/GG.png';
import { initLoginAnimations, initHoverEffects } from './loginAnimation';

function Login() {
    const loginRef = useRef(null);
    const bgRef = useRef(null);
    const itemRef = useRef(null);
    const headerRef = useRef(null);
    const formRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const refs = { bgRef, itemRef, headerRef, formRef, buttonsRef };
        
        const tl = initLoginAnimations(refs);
        const cleanupHover = initHoverEffects(refs);

        return () => {
            tl.kill();
            cleanupHover();
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className='login' ref={loginRef}>
            <div className='login__img'>
                <img src={Bg} alt='' className='login__bg' ref={bgRef} />
                <img src={Item} alt='' className='login__item' ref={itemRef} />
            </div>
            <section className='login__section'>
                <div className='login__section__header' ref={headerRef}>
                    <h1>Sign In to Create Exam</h1>
                    <p>
                        if you don't have account you can{' '}
                        <Link
                            to='/register'
                            style={{
                                color: '#4461f2',
                                textDecoration: 'none'
                            }}
                        >
                            Register here!
                        </Link>
                    </p>
                </div>
                <div ref={formRef}>
                    <Form labelCol={{ span: 24 }}>
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your user name!'
                                }
                            ]}
                        >
                            <Input placeholder='Enter Email' />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password!'
                                }
                            ]}
                        >
                            <Input.Password placeholder='••••••••' />
                        </Form.Item>

                        <div className='login__footer'>
                            <h5 style={{ textAlign: 'end' }}>
                                Recover Password ?
                            </h5>

                            <div className='submit'>
                                <button
                                    className='submit__btn'
                                    htmlType='submit'
                                >
                                    Sign In
                                </button>
                            </div>

                            <div className='login__divider'>
                                <div className='border' />
                                <h5 style={{ textAlign: 'center' }}>
                                    Or continue with
                                </h5>
                                <div className='border' />
                            </div>
                        </div>

                        <div className='login_button' ref={buttonsRef}>
                            <button>
                                <img src={GG} alt='' />
                            </button>
                            <button>
                                <img src={FB} alt='' />
                            </button>
                        </div>
                    </Form>
                </div>
            </section>
        </div>
    );
}

export default Login;