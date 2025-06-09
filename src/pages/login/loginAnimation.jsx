import gsap from 'gsap';

export const initLoginAnimations = (refs) => {
    const { bgRef, itemRef, headerRef, formRef, buttonsRef } = refs;
    
    gsap.set(bgRef.current, { x: '0%', y: '-57%' });
    gsap.set(itemRef.current, { x: '100%', y: '35%' });

    const tl = gsap.timeline();

    tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(
        itemRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
    )
    .fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
    )
    .fromTo(
        formRef.current.querySelectorAll('.ant-form-item'),
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        },
        '-=0.2'
    )
    .fromTo(
        formRef.current.querySelector('.submit__btn'),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '-=0.1'
    )
    .fromTo(
        buttonsRef.current.querySelectorAll('button'),
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        },
        '-=0.2'
    );

    return tl;
};

export const initHoverEffects = (refs) => {
    const { formRef, buttonsRef } = refs;
    
    const submitBtn = formRef.current.querySelector('.submit__btn');
    const socialBtns = buttonsRef.current.querySelectorAll('button');

    const submitBtnEnter = () => {
        gsap.to(submitBtn, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    };

    const submitBtnLeave = () => {
        gsap.to(submitBtn, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    const socialBtnEnter = (btn) => () => {
        gsap.to(btn, {
            scale: 1.1,
            rotation: 5,
            duration: 0.2,
            ease: 'power2.out'
        });
    };

    const socialBtnLeave = (btn) => () => {
        gsap.to(btn, {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: 'power2.out'
        });
    };

    submitBtn.addEventListener('mouseenter', submitBtnEnter);
    submitBtn.addEventListener('mouseleave', submitBtnLeave);

    const socialHandlers = [];
    socialBtns.forEach((btn) => {
        const enterHandler = socialBtnEnter(btn);
        const leaveHandler = socialBtnLeave(btn);
        
        btn.addEventListener('mouseenter', enterHandler);
        btn.addEventListener('mouseleave', leaveHandler);
        
        socialHandlers.push({ btn, enterHandler, leaveHandler });
    });

    return () => {
        submitBtn.removeEventListener('mouseenter', submitBtnEnter);
        submitBtn.removeEventListener('mouseleave', submitBtnLeave);
        
        socialHandlers.forEach(({ btn, enterHandler, leaveHandler }) => {
            btn.removeEventListener('mouseenter', enterHandler);
            btn.removeEventListener('mouseleave', leaveHandler);
        });
    };
};