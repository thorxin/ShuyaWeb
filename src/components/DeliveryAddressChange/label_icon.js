import { HOME_LABEL, OTHER_LABEL, WORK_LABEL } from "../../constant/deliveryLabelConfig";

export const LabelIcon = ({ labelName = "" }) => {
    switch (labelName) {
        case HOME_LABEL:
            return (
                <svg height="15px" width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.56 51.06">
                    <defs>
                        <style>{".cls-1{fill:#e91729}"}</style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path
                                className="cls-1"
                                d="M34.65 29.3v13.42H21.9V29.3a5.19 5.19 0 0 1 5.19-5.19h2.36a5.19 5.19 0 0 1 5.2 5.19Z"
                            />
                            <path
                                className="cls-1"
                                d="M56 18.52 49.72 10 45.6 4.48A11.12 11.12 0 0 0 36.7 0H19.85A11.12 11.12 0 0 0 11 4.48L6.86 10 .71 18.27l-.16.25a4.11 4.11 0 0 0 3.57 6.15h2.71v18.69a7.72 7.72 0 0 0 7.7 7.7H42a7.71 7.71 0 0 0 7.7-7.7V24.67h2.71A4.12 4.12 0 0 0 56 18.52Zm-11.28 1.15v23.69a2.7 2.7 0 0 1-2.7 2.7H14.53a2.71 2.71 0 0 1-2.7-2.7V19.67H5.89l.94-1.27 6.25-8.4L15 7.46A6.12 6.12 0 0 1 19.85 5H36.7a6.09 6.09 0 0 1 4.88 2.46L43.46 10l6.26 8.42.94 1.26Z"
                            />
                        </g>
                    </g>
                </svg>
            )
        case WORK_LABEL:
            return (
                <svg height="15px" width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.31 51.06">
                    <defs>
                        <style>{".cls-1{fill:#e91729}"}</style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path
                                className="cls-1"
                                d="M44.65 15.46h-6.1V12.9a12.9 12.9 0 1 0-25.8 0v2.56H6.66A6.67 6.67 0 0 0 0 22.12V39.4a11.67 11.67 0 0 0 11.66 11.66h28A11.67 11.67 0 0 0 51.31 39.4V22.12a6.67 6.67 0 0 0-6.66-6.66Zm-26.9-2.56a7.9 7.9 0 1 1 15.8 0v2.56h-15.8Zm28.56 26.5a6.66 6.66 0 0 1-6.66 6.66h-28A6.67 6.67 0 0 1 5 39.4V22.12a1.66 1.66 0 0 1 1.66-1.66h38a1.66 1.66 0 0 1 1.66 1.66Z"
                            />
                            <path
                                className="cls-1"
                                d="M31.23 28.59a7.81 7.81 0 0 1-5.58 2.32 7.92 7.92 0 0 1-7.46-5.3H13a12.91 12.91 0 0 0 25.28 0h-5.17a7.76 7.76 0 0 1-1.88 2.98Z"
                            />
                        </g>
                    </g>
                </svg>
            )
        case OTHER_LABEL:
            return (
                <svg height="15px" width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.35 53.19">
                    <defs>
                        <style>{".cls-1{fill:#e91729}"}</style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path
                                className="cls-1"
                                d="M39.35 19.68a19.68 19.68 0 1 0-39.35 0 18 18 0 0 0 .1 2v.05c.5 5.07 3.39 18.75 19.57 31.48 16.12-12.7 19-26.33 19.56-31.43v-.15c.1-1.11.09-1.78.09-1.9ZM19.68 30.92a11.25 11.25 0 1 1 11.24-11.24 11.25 11.25 0 0 1-11.24 11.24Z"
                            />
                            <circle className="cls-1" cx={19.68} cy={19.42} r={5.15} />
                        </g>
                    </g>
                </svg>
            )
        default:
            return null;
    }
}