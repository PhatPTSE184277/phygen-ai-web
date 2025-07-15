import gsap from "gsap";

export const initLoginAnimations = (refs) => {
  const { bgRef, itemRef, headerRef, formRef, buttonsRef } = refs;

  // Set vị trí bắt đầu nếu có
  if (bgRef.current) {
    gsap.set(bgRef.current, { x: "0%", y: "-57%" });
  }
  if (itemRef.current) {
    gsap.set(itemRef.current, { x: "100%", y: "35%" });
  }

  const tl = gsap.timeline();

  // Animate background
  if (bgRef.current) {
    tl.fromTo(
      bgRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }

  // Animate decorative item
  if (itemRef.current) {
    tl.fromTo(
      itemRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }

  // Animate header
  if (headerRef.current) {
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }

  // Animate form items
  const formItems = formRef.current?.querySelectorAll(".ant-form-item") || [];
  if (formItems.length > 0) {
    tl.fromTo(
      formItems,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }

  // Animate submit button
  const submitBtn = formRef.current?.querySelector(".submit__btn");
  if (submitBtn) {
    tl.fromTo(
      submitBtn,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.1"
    );
  }

  // Animate social login buttons
  const socialBtns = buttonsRef.current?.querySelectorAll("button") || [];
  if (socialBtns.length > 0) {
    tl.fromTo(
      socialBtns,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }

  return tl;
};

export const initHoverEffects = (refs) => {
  const { formRef, buttonsRef } = refs;

  const submitBtn = formRef.current?.querySelector(".submit__btn");
  const socialBtns = buttonsRef.current?.querySelectorAll("button") || [];

  // Hover animations for submit button
  const submitBtnEnter = () => {
    gsap.to(submitBtn, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const submitBtnLeave = () => {
    gsap.to(submitBtn, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Hover animations for social buttons
  const socialBtnEnter = (btn) => () => {
    gsap.to(btn, {
      scale: 1.1,
      rotation: 5,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const socialBtnLeave = (btn) => () => {
    gsap.to(btn, {
      scale: 1,
      rotation: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Add event listeners if element exists
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

  // Cleanup function
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
