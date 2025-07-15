import gsap from "gsap";

export const initRegisterAnimations = (refs) => {
  const { bgRef, itemRef, headerRef, formRef, buttonsRef } = refs;

  if (bgRef.current) {
    gsap.set(bgRef.current, { x: "53%", y: "-57%" });
  }
  if (itemRef.current) {
    gsap.set(itemRef.current, { x: "217%", y: "0%" });
  }

  const tl = gsap.timeline();

  if (bgRef.current) {
    tl.fromTo(
      bgRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );
  }

  if (itemRef.current) {
    tl.fromTo(
      itemRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(2)" },
      "-=0.8"
    );
  }

  if (headerRef.current) {
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "bounce.out" },
      "-=0.5"
    );
  }

  const formItems = formRef.current?.querySelectorAll(".ant-form-item") || [];
  if (formItems.length > 0) {
    tl.fromTo(
      formItems,
      {
        opacity: 0,
        x: -100,
        rotation: -10,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          from: "start",
          ease: "power2.out",
        },
        ease: "back.out(1.2)",
      },
      "-=0.3"
    );
  }

  const submitBtn = formRef.current?.querySelector(".submit__btn");
  if (submitBtn) {
    tl.fromTo(
      submitBtn,
      { opacity: 0, scale: 0, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      },
      "-=0.2"
    );
  }

  const socialBtns = buttonsRef.current?.querySelectorAll("button") || [];
  if (socialBtns.length > 0) {
    tl.fromTo(
      socialBtns,
      {
        opacity: 0,
        y: 50,
        scale: 0,
        rotation: 45,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "elastic.out(1, 0.4)",
      },
      "-=0.4"
    );
  }

  return tl;
};

export const initRegisterHoverEffects = (refs) => {
  const { formRef, buttonsRef } = refs;

  const submitBtn = formRef.current?.querySelector(".submit__btn");
  const socialBtns = buttonsRef.current?.querySelectorAll("button") || [];

  const submitBtnEnter = () => {
    gsap.to(submitBtn, {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(68, 97, 242, 0.6)",
      backgroundColor: "#5a73ff",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const submitBtnLeave = () => {
    gsap.to(submitBtn, {
      scale: 1,
      boxShadow: "0 0 0px rgba(68, 97, 242, 0)",
      backgroundColor: "#4461F2",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const socialBtnEnter = (btn) => () => {
    gsap.to(btn, {
      scale: 1.2,
      rotation: 10,
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(btn.querySelector("img"), {
      scale: 1.1,
      rotation: -10,
      duration: 0.3,
    });
  };

  const socialBtnLeave = (btn) => () => {
    gsap.to(btn, {
      scale: 1,
      rotation: 0,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(btn.querySelector("img"), {
      scale: 1,
      rotation: 0,
      duration: 0.3,
    });
  };

  if (submitBtn) {
    submitBtn.addEventListener("mouseenter", submitBtnEnter);
    submitBtn.addEventListener("mouseleave", submitBtnLeave);
  }

  const socialHandlers = [];
  socialBtns.forEach((btn) => {
    const enterHandler = socialBtnEnter(btn);
    const leaveHandler = socialBtnLeave(btn);

    btn.addEventListener("mouseenter", enterHandler);
    btn.addEventListener("mouseleave", leaveHandler);

    socialHandlers.push({ btn, enterHandler, leaveHandler });
  });

  return () => {
    if (submitBtn) {
      submitBtn.removeEventListener("mouseenter", submitBtnEnter);
      submitBtn.removeEventListener("mouseleave", submitBtnLeave);
    }

    socialHandlers.forEach(({ btn, enterHandler, leaveHandler }) => {
      btn.removeEventListener("mouseenter", enterHandler);
      btn.removeEventListener("mouseleave", leaveHandler);
    });
  };
};
