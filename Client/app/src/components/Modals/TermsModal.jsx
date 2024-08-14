import React from "react";
import "./Styles.css";
import { IoMdClose } from "react-icons/io";

export default function TermsModal({ formik, SetTermModalIsOpen }) {
  const [ScrolledToBottom, SetScrolledToBottom] = React.useState(false);

  const handleAgreement = () => {
    formik.setFieldValue("terms", true);
    SetTermModalIsOpen(false);
  };

  const handleDecline = () => {
    formik.setFieldValue("terms", false);
    SetTermModalIsOpen(false);
  };

  const containerRef = React.useRef(null);
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        SetScrolledToBottom(true);
        container.removeEventListener("scroll", handleScroll);
      }
    }
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="term-modal-window">
      <div
        className="term-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          title="Close"
          onClick={() => SetTermModalIsOpen(false)}
          className="modal-close"
        >
          <IoMdClose size={30} />
        </div>
        <div className="term-header">
          <h2>Blade Quest - Terms & Conditions</h2>
        </div>
        <div className="term-body" ref={containerRef}>
          <div>Introduction</div>
          <p>
            Welcome to Blade Quest! These terms and conditions outline the rules
            and regulations for the use of Blade Quest's game. By accessing or
            playing Blade Quest, we assume you accept these terms and conditions
            in full. Do not continue to use Blade Quest if you do not accept all
            of the terms and conditions stated on this page.
          </p>

          <div>License</div>

          <p>
            Unless otherwise stated, Blade Quest and/or its licensors own the
            intellectual property rights for all material on Blade Quest. All
            intellectual property rights are reserved. You may view and/or print
            pages from Blade Quest for your own personal use, subject to
            restrictions set in these terms and conditions.
          </p>

          <div>User Accounts</div>

          <p>
            To play Blade Quest, you may be required to create an account and
            provide certain information about yourself. You agree to provide
            accurate and complete information and to update it as necessary. You
            are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          <div>User Conduct</div>

          <p>
            You agree not to use Blade Quest for any unlawful purpose or in any
            way that might harm, threaten, or abuse others. You must not engage
            in any activity that interferes with or disrupts the services of
            Blade Quest or the servers and networks connected to the game.
          </p>

          <div>Virtual Goods</div>

          <p>
            Blade Quest may offer virtual goods or currency for purchase or as
            part of the gameplay. These virtual goods are non-transferable and
            non-refundable, and have no real-world monetary value. You
            acknowledge that you do not own the virtual goods but have a
            limited, revocable, non-exclusive, and non-transferable right to use
            them.
          </p>

          <div>Limitation of Liability</div>

          <p>
            Blade Quest is provided on an "as is" and "as available" basis. We
            make no warranties, whether express or implied, about the game,
            including its availability, reliability, or suitability for any
            particular purpose. In no event shall Blade Quest, its affiliates,
            or its licensors be liable for any indirect, incidental, special, or
            consequential damages arising out of or in connection with the use
            of Blade Quest.
          </p>

          <div>Termination</div>

          <p>
            We reserve the right to terminate or suspend your account at any
            time, without notice or liability, for any reason, including if you
            breach these terms and conditions. Upon termination, your right to
            use Blade Quest will immediately cease.
          </p>

          <div>Changes to These Terms</div>

          <p>
            Blade Quest reserves the right to modify these terms and conditions
            at any time. We will notify you of any changes by posting the new
            terms on this page. Your continued use of Blade Quest after such
            modifications will constitute your acknowledgment of the modified
            terms and your agreement to abide by them.
          </p>
        </div>
        <div className="term-footer">
          <h1>
            I agree to <span>terms & conditions</span> and I read the Privacy
            notice.
          </h1>
          <div>
            <button
              disabled={!ScrolledToBottom}
              className="accept"
              onClick={handleAgreement}
            >
              Accept
            </button>
            <button
              disabled={!ScrolledToBottom}
              className="decline"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
