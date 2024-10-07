const hoverWords = document.querySelectorAll('.hover-word');

hoverWords.forEach(word => {
    word.addEventListener('mouseover', () => {
        const newImage = word.getAttribute('data-image');
        const dynamicImage = document.getElementById('dynamic-image');
        dynamicImage.src = newImage;  // Set the image source
        dynamicImage.style.opacity = "1";  // Show the image on hover
    });

    word.addEventListener('mouseout', () => {
        const dynamicImage = document.getElementById('dynamic-image');
        dynamicImage.style.opacity = "0";  // Hide the image when not hovering
    });
});



const hoverWords2 = document.querySelectorAll('.hover-word-2');

hoverWords2.forEach(word => {
    word.addEventListener('mouseover', () => {
        const newImage = word.getAttribute('data-image');
        window.parent.postMessage({ image: newImage, section: 'section2' }, '*');  // Send the image URL to the parent window with section info
    });

    word.addEventListener('mouseout', () => {
        window.parent.postMessage({ image: null, section: 'section2' }, '*');  // Send null image for reset
    });
});


window.addEventListener('message', (event) => {
    if (event.data.section === 'section2') {  // Check if the message is for the correct section
        const dynamicImage = document.getElementById('dynamic-image-2');
        if (event.data.image) {
            dynamicImage.src = event.data.image;  // Change the image source based on the message
        } else {
            // Optionally reset to a default image if necessary
            dynamicImage.src = "https://images.squarespace-cdn.com/content/5e28bcdb6e962366618ef23b/a72b8b70-2f3e-4439-a695-71f1c9c9c9ae/20230505_sol_p400_rooftop_041+2.png?content-type=image%2Fpng";
        }
    }
});


    // List of hobbies to randomly select from
    const hobbies = ["Rug making", "Woodworking", "Illumination", "Horticulture", "Making a terrarium", "Learning to sew"];

    // Function to replace the placeholder text with a random hobby
    function setRandomHobby() {
        const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
        document.getElementById("random-hobby").textContent = randomHobby;
    }

    // Set the random hobby when the page loads
    setRandomHobby();



    //footer flower//
    const baseShapes = [
        'M248.819 20.7874C256.76 -5.59572 294.117 -5.59582 302.058 20.7873L343.301 157.81L482.587 125.015C509.406 118.701 528.085 151.054 509.207 171.122L411.163 275.351L509.207 379.58C528.085 399.648 509.406 432.001 482.587 425.687L343.301 392.892L302.058 529.914C294.117 556.298 256.76 556.297 248.819 529.914L207.577 392.892L68.291 425.687C41.4721 432.001 22.7933 399.648 41.6712 379.58L139.715 275.351L41.6704 171.122C22.7925 151.054 41.4715 118.701 68.2904 125.015L207.576 157.81L248.819 20.7874ZM290.197 275.351L282.818 288.132H268.06L260.681 275.35L268.06 262.57H282.818L290.197 275.351Z',
        'M343.864 0.116211H206.392V108.69L129.88 32.178L32.2443 129.813L108.261 205.83L0.67774 205.83L0.677734 344.291H108.261L32.2442 420.308L129.88 517.944L206.392 441.432V549.016H343.864V441.433L420.375 517.944L518.011 420.309L441.993 344.291H549.578V205.83H441.993L518.01 129.813L420.375 32.1775L343.864 108.689V0.116211Z',
        'M152.173 243.24L241.214 153.422L363.522 185.625L396.785 307.641L307.742 397.461L185.436 365.258L152.173 243.24ZM308.937 464.55L169.231 511.977C150.825 518.225 131.604 504.953 130.926 485.528L127.934 399.841L17.0076 302.565C2.39379 289.75 4.27698 266.468 20.7605 256.168L93.4735 210.732L122.254 66.0285C126.045 46.9649 147.149 36.9549 164.311 46.0801L240.012 86.3308L379.719 38.9036C398.124 32.6554 417.345 45.9271 418.023 65.3523L421.015 151.032L531.95 248.315C546.564 261.131 544.681 284.412 528.197 294.712L455.482 340.15L426.701 484.855C422.909 503.919 401.805 513.929 384.643 504.804L308.937 464.55Z',
        'M288.122 44.4013C303.711 -20.7483 358.274 65.5432 352.202 135.143C393.906 93.1181 438.631 57.8208 463.92 67.701C493.991 79.4494 479.263 113.93 467.889 140.56C457.884 163.982 450.475 181.331 478.424 171.794C479.554 171.408 480.663 171.054 481.752 170.731C545.968 151.656 498.518 242.055 435.207 271.596C492.454 286.701 545.385 307.785 549.473 334.626C554.334 366.543 517.109 371.028 488.36 374.493C463.073 377.54 444.344 379.797 466.578 399.234C467.477 400.019 468.338 400.803 469.163 401.584C517.789 447.659 415.778 451.766 358.539 411.708C374.081 468.837 382.287 525.218 361.086 542.179C335.876 562.347 313.379 532.351 296.004 509.186C280.722 488.811 269.403 473.72 263.687 502.693C263.456 503.864 263.208 505.002 262.943 506.107C247.355 571.256 192.792 484.965 198.864 415.365C157.159 457.39 112.435 492.687 87.1455 482.807C57.0747 471.059 71.8026 436.578 83.1768 409.948C93.1812 386.526 100.591 369.177 72.6415 378.714C71.5118 379.1 70.4026 379.454 69.3136 379.777C5.09786 398.852 52.5473 308.453 115.858 278.912C58.6115 263.807 5.68051 242.723 1.5925 215.882C-3.26846 183.966 33.9568 179.48 62.7059 176.015C87.9924 172.968 106.721 170.711 84.4876 151.275C83.5889 150.489 82.7277 149.705 81.903 148.924C33.2764 102.849 135.287 98.7421 192.527 138.8C176.985 81.6707 168.779 25.2901 189.98 8.32927C215.19 -11.8386 237.687 18.1566 255.062 41.3218C270.344 61.697 281.663 76.7884 287.379 47.8149C287.61 46.6439 287.858 45.5062 288.122 44.4013Z',
        'M190.604 132.189C176.238 77.3765 169.441 24.6353 189.823 8.32927C215.033 -11.8386 237.53 18.1566 254.905 41.3218C270.187 61.697 281.506 76.7884 287.222 47.8149C299.437 -14.0993 358.999 17.4545 387.254 40.9707L356.887 130.309C397.174 90.4605 439.451 58.2021 463.764 67.701C493.834 79.4494 479.106 113.93 467.732 140.56C457.728 163.982 450.318 181.331 478.267 171.794C537.994 151.415 540.449 218.774 534.21 255.002L441.658 273.372C496.311 288.337 545.386 308.821 549.317 334.626C554.178 366.543 516.952 371.028 488.203 374.493C462.917 377.54 444.188 379.797 466.421 399.234C513.934 440.769 456.826 476.574 422.333 489.285L360.148 418.319C374.514 473.132 381.312 525.873 360.929 542.179C335.719 562.347 313.222 532.351 295.847 509.186C280.565 488.811 269.246 473.72 263.53 502.693C251.316 564.607 191.753 533.054 163.499 509.537L193.866 420.199C153.579 460.048 111.302 492.306 86.9887 482.807C56.918 471.059 71.6458 436.578 83.0201 409.948C93.0245 386.526 100.434 369.177 72.4848 378.714C12.7583 399.093 10.3034 331.734 16.5418 295.506L109.094 277.136C54.4411 262.171 5.36598 241.687 1.43576 215.882C-3.4252 183.966 33.8001 179.48 62.5491 176.015C87.8356 172.968 106.565 170.711 84.3309 151.275C36.8188 109.739 93.9265 73.9336 128.419 61.2226L190.604 132.189Z',
        'M189.748 0.902344L153.239 159.039L58.7933 162.337L109.94 244.19L0.867676 361.156L159.209 397.712L162.555 493.502L245.15 441.89L361.12 550.034L397.553 392.228L490.661 388.977L439.941 307.807L550 189.782L392.399 153.397L389.194 61.6345L308.768 111.891L189.748 0.902344Z',
        'M243.884 179.249L282.743 10.9302L117.545 61.4363L243.884 179.249ZM306.046 370.681L267.187 539L432.385 488.494L306.046 370.681ZM539 282.742L370.681 243.883L488.494 117.544L539 282.742ZM179.249 306.046L10.9302 267.187L61.4363 432.385L179.249 306.046ZM467.163 93.7657L320.666 185.307L314.637 12.6662L467.163 93.7657ZM229.263 364.623L82.7662 456.165L235.292 537.264L229.263 364.623ZM456.165 467.163L364.623 320.666L537.264 314.637L456.165 467.163ZM185.306 229.263L93.7647 82.7662L12.6652 235.292L185.306 229.263Z',
        'M272.88 268.37L276.448 268.238L279.653 269.934L281.554 272.965L281.682 276.426L279.986 279.632L276.907 281.564L273.335 281.677L270.236 280.015L268.359 276.988L268.243 273.312L269.904 270.216L272.88 268.37ZM183.415 189.367C179.23 187 174.886 184.605 170.377 182.188C93.6225 141.04 35.2638 146.73 35.2638 146.73C35.2638 146.73 65.5239 199.928 139.583 239.631C144.176 242.093 148.668 244.428 153.054 246.643C148.205 246.684 143.201 246.783 138.041 246.946C50.995 249.688 3.2998 283.795 3.2998 283.795C3.2998 283.795 56.1049 314.736 140.093 312.09C145.276 311.927 150.309 311.704 155.192 311.431C151.023 313.886 146.749 316.468 142.372 319.182C68.3588 365.08 44.107 418.465 44.107 418.465C44.107 418.465 105.308 418.858 176.721 374.573C181.099 371.857 185.321 369.166 189.388 366.504C187.021 370.689 184.627 375.033 182.21 379.542C141.061 456.297 146.751 514.655 146.751 514.655C146.751 514.655 199.949 484.395 239.652 410.337C242.115 405.744 244.45 401.251 246.664 396.865C246.706 401.714 246.805 406.719 246.967 411.879C249.709 498.925 283.816 546.62 283.816 546.62C283.816 546.62 314.757 493.815 312.111 409.827C311.965 405.198 311.773 400.688 311.538 396.299C313.821 400.121 316.207 404.022 318.702 407.998C363.372 479.171 418.513 505.727 418.513 505.727C418.513 505.727 420.203 447.116 373.907 373.351C371.208 369.05 368.541 364.908 365.912 360.922C370.238 363.35 374.727 365.8 379.381 368.263C453.652 407.566 514.684 402.993 514.684 402.993C514.684 402.993 486.841 351.39 409.866 310.655C405.43 308.308 401.1 306.08 396.878 303.964C401.797 303.904 406.865 303.782 412.08 303.589C496.053 300.491 546.621 266.015 546.621 266.015C546.621 266.015 496.707 235.246 409.677 238.457C404.636 238.643 399.748 238.88 395.012 239.16C399.251 236.644 403.589 233.998 408.019 231.218C479.192 186.548 505.747 131.407 505.747 131.407C505.747 131.407 447.136 129.717 373.372 176.013C369.071 178.712 364.93 181.378 360.944 184.007C363.372 179.681 365.822 175.193 368.284 170.54C407.588 96.2683 403.014 35.237 403.014 35.237C403.014 35.237 351.411 63.0792 310.677 140.055C308.329 144.49 306.101 148.82 303.986 153.042C303.925 148.123 303.803 143.055 303.611 137.84C300.513 53.8678 266.036 3.2998 266.036 3.2998C266.036 3.2998 235.268 53.2136 238.479 140.243C238.686 145.857 238.956 151.281 239.279 156.517C236.589 151.924 233.744 147.2 230.737 142.351C184.84 68.3379 131.455 44.0861 131.455 44.0861C131.455 44.0861 131.061 105.287 175.347 176.7C178.062 181.078 180.754 185.3 183.415 189.367Z',
        'M146.188 188.502C185.287 191.281 225.362 178.077 255.778 148.705L285.65 119.857C302.792 155.113 334.267 183.221 374.916 194.877L414.827 206.321C392.874 238.792 384.273 280.097 394.502 321.122L404.55 361.423C365.451 358.644 325.376 371.848 294.96 401.22L265.087 430.068C247.946 394.812 216.471 366.704 175.822 355.048L135.911 343.604C157.864 311.133 166.465 269.828 156.236 228.803L146.188 188.502ZM505.699 175.637L531.628 279.632C545.757 336.301 522.086 393.534 476.596 424.735L399.454 499.23C357.419 539.823 295.976 547.926 246.194 524.084L143.19 494.547C87.0318 478.444 49.2967 429.305 45.0391 374.288L19.1102 270.293C4.98092 213.623 28.6515 156.391 74.1426 125.189L151.284 50.6951C193.319 10.1024 254.762 1.99857 304.544 25.8414L407.548 55.3775C463.706 71.4806 501.441 120.62 505.699 175.637Z',
        'M411.662 58.8208C411.662 40.5954 396.888 25.8208 378.662 25.8208H179.213C160.987 25.8208 146.213 40.5954 146.213 58.8208V101.42C146.213 119.646 131.438 134.42 113.213 134.42L58.8193 134.42C40.594 134.42 25.8193 149.195 25.8193 167.42L25.8193 393.415C25.8193 411.64 40.5939 426.415 58.8193 426.415H113.213C131.438 426.415 146.213 441.189 146.213 459.415V491.179C146.213 509.405 160.987 524.179 179.213 524.179H378.662C396.888 524.179 411.662 509.405 411.662 491.179V459.415C411.662 441.189 426.437 426.415 444.662 426.415H491C509.226 426.415 524 411.64 524 393.415V167.42C524 149.195 509.226 134.42 491 134.42L444.662 134.42C426.437 134.42 411.662 119.646 411.662 101.42V58.8208ZM152.553 366.373C153.474 371.906 155.862 377.152 160.004 380.935C175.975 395.523 209.596 413.069 278.937 413.069C343.451 413.069 377.045 397.882 394.272 384.018C398.432 380.671 401.172 375.949 402.564 370.794C408.528 348.713 413.142 319.123 413.142 280.418C413.142 233.885 406.473 200.526 398.807 177.552C397.051 172.287 393.817 167.629 389.286 164.424C370.316 151.005 336.661 136.931 278.937 136.931C215.499 136.931 181.131 153.93 163.377 168.376C158.734 172.154 155.801 177.568 154.597 183.431C150.073 205.447 146.527 236.66 146.527 280.418C146.527 317.323 149.049 345.306 152.553 366.373Z',
        // Add more paths here
      ];
      
      const midShapes = [
        'M224.16 116.691C208.808 131.132 184.058 116.843 188.889 96.3265L201.615 42.273C204.882 28.3986 220.605 21.6026 232.949 28.7295L260.671 44.7345C273.015 51.8614 274.991 68.8761 264.609 78.6423L224.16 116.691ZM150.766 96.3266C155.597 116.843 130.847 131.132 115.494 116.691L75.0462 78.6424C64.664 68.8762 66.64 51.8615 78.9841 44.7347L106.706 28.7296C119.05 21.6027 134.773 28.3988 138.04 42.2732L150.766 96.3266ZM224.16 223.451C208.808 209.009 184.058 223.299 188.889 243.815L201.615 297.868C204.882 311.743 220.605 318.539 232.949 311.412L260.671 295.407C273.015 288.28 274.991 271.265 264.609 261.499L224.16 223.451ZM115.495 223.451C130.848 209.009 155.598 223.298 150.767 243.815L138.041 297.868C134.774 311.743 119.051 318.539 106.707 311.412L78.9851 295.407C66.6409 288.28 64.6649 271.265 75.0472 261.499L115.495 223.451ZM96.3653 149.895C116.524 155.982 116.524 184.525 96.3654 190.612L43.4155 206.602C29.7626 210.725 16.001 200.505 16.001 186.243L16.001 154.264C16.001 140.002 29.7626 129.782 43.4155 133.905L96.3653 149.895ZM243.266 190.62C223.071 184.552 223.071 155.955 243.266 149.886L296.614 133.856C310.261 129.755 324 139.973 324 154.223V186.284C324 200.534 310.261 210.752 296.614 206.651L243.266 190.62Z', 
        'M253.624 76.3169L182.746 6.05139C173.293 -3.31945 157.479 -0.920889 151.23 10.8314L130.078 50.6132L33.8714 76.8399C21.0298 80.3406 15.1998 95.2356 22.2532 106.523L46.1025 144.69L20.6248 241.097C17.2221 253.973 27.208 266.483 40.5177 266.018L85.5918 264.444L156.473 334.713C165.926 344.083 181.74 341.685 187.989 329.932L209.141 290.15L305.352 263.922C318.194 260.421 324.024 245.527 316.97 234.239L293.216 196.224L318.6 99.6375C321.982 86.768 311.999 74.2785 298.7 74.7428L253.624 76.3169ZM248.101 186L195.334 246.171L116.714 230.535L90.9723 154.933L143.887 94.593L222.411 110.211L248.101 186Z', 
        'M132.256 14.0964L143.269 0L170.542 21.3083C185.605 33.0766 188.276 54.8273 176.507 69.89L144.186 111.26C114.06 87.7233 108.719 44.2217 132.256 14.0964ZM209.131 326.449L198.117 340.545L170.844 319.237C155.781 307.468 153.111 285.718 164.879 270.655L197.2 229.285C227.326 252.822 232.667 296.323 209.131 326.449ZM271.556 30.8597L253.308 33.1003C215.79 37.707 189.11 71.856 193.716 109.374L245.931 102.963C264.69 100.66 278.03 83.5853 275.727 64.8261L271.556 30.8597ZM88.0673 307.445L69.8189 309.685L65.6484 275.719C63.345 256.96 76.6851 239.885 95.4443 237.582L147.659 231.171C152.266 268.689 125.586 302.838 88.0673 307.445ZM339.886 140.302L325.414 129.788C294.833 107.57 252.03 114.349 229.812 144.93L271.97 175.559C287.26 186.668 308.662 183.279 319.771 167.988L339.886 140.302ZM15.0621 208.645L0.96582 197.632L22.0347 170.665C33.6707 155.771 55.1771 153.131 70.0706 164.767L111.134 196.849C87.8618 226.636 44.849 231.917 15.0621 208.645ZM310.101 271.145L307.86 252.896C303.254 215.378 269.105 188.698 231.586 193.304L237.997 245.519C240.301 264.278 257.375 277.619 276.135 275.315L310.101 271.145ZM33.5189 87.6448L31.2783 69.3964L65.2448 65.2259C84.0039 62.9225 101.078 76.2626 103.382 95.0218L109.793 147.237C72.2747 151.843 38.1256 125.163 33.5189 87.6448Z', 
        'M99.9906 71.8509C104.802 103.795 87.0035 135.909 55.5999 147.964L50.7876 149.811C77.1299 168.915 87.459 204.451 73.6941 235.368L71.784 239.658C103.882 234.601 136.251 252.42 148.364 283.976L150.073 288.429C169.467 262.098 205.192 251.835 236.294 265.683L239.984 267.326C235.172 235.381 252.971 203.267 284.375 191.212L290.671 188.795C263.451 170.685 251.747 135.378 264.474 103.877L266.115 99.8153C234.707 103.803 203.463 86.0781 191.611 55.2015L189.903 50.7541C170.509 77.0815 134.786 87.3429 103.685 73.4958L99.9906 71.8509ZM35.458 148.239L16.2391 191.405C8.33546 209.157 16.319 229.955 34.0709 237.859L59.6592 249.251L76.8343 293.994C83.798 312.135 104.15 321.196 122.291 314.233L148.107 304.323L191.642 323.706C209.595 331.699 230.629 323.625 238.623 305.671L250.18 279.714L294.392 262.742C312.534 255.778 321.595 235.427 314.631 217.286L304.847 191.798L323.428 145.808C330.708 127.791 322.003 107.284 303.986 100.005L280.55 90.536L263.14 45.1838C256.177 27.0427 235.825 17.9816 217.684 24.9453L191.87 34.8545L148.338 15.473C130.384 7.47954 109.35 15.5538 101.357 33.5074L89.8022 59.4595L45.5823 76.4339C27.4411 83.3977 18.38 103.749 25.3437 121.89L35.458 148.239Z',
        'M86.803 81.771C80.2159 53.7941 113.966 34.3086 134.901 54.0016L169.949 86.9698L204.995 54.0024C225.931 34.3093 259.681 53.7948 253.093 81.7718L242.015 128.825L288.26 142.721C315.799 150.997 315.799 189.992 288.26 198.268L242.125 212.131L253.093 258.717C259.681 286.694 225.931 306.18 204.995 286.486L169.949 253.519L134.902 286.487C113.967 306.18 80.2169 286.695 86.804 258.718L97.7588 212.19L51.6164 198.256C24.1278 189.955 24.1279 151.034 51.6165 142.733L97.8677 128.766L86.803 81.771ZM177.685 165.657V174.832L169.948 179.299L161.684 174.528V165.961L169.948 161.19L177.685 165.657Z', 
        'M170.504 38C189.669 38 203.395 56.5035 197.835 74.8442C189.64 101.876 151.368 101.876 143.173 74.8442C137.613 56.5035 151.339 38 170.504 38ZM170.504 302C189.669 302 203.395 283.497 197.835 265.156C189.64 238.124 151.368 238.124 143.173 265.156C137.613 283.497 151.339 302 170.504 302ZM73.9729 193.898C101.448 187.429 120.584 220.574 101.244 241.133C88.1654 255.037 65.3799 252.391 55.8357 235.86C46.2916 219.329 55.3927 198.273 73.9729 193.898ZM266.71 145.601C239.235 152.07 220.1 118.926 239.439 98.366C252.518 84.4624 275.304 87.1086 284.848 103.639C294.392 120.17 285.291 141.226 266.71 145.601ZM101.243 98.366C120.583 118.926 101.447 152.07 73.9716 145.601C55.3914 141.226 46.2903 120.17 55.8344 103.639C65.3785 87.1086 88.1641 84.4624 101.243 98.366ZM239.439 241.133C220.099 220.574 239.235 187.429 266.71 193.898C285.29 198.273 294.391 219.329 284.847 235.86C275.303 252.391 252.518 255.037 239.439 241.133Z', 
        'M125.124 84.822C135.886 94.8581 153.477 89.4801 156.788 75.1415L167.105 30.4533C170.415 16.1148 156.962 3.56964 142.889 7.87211L99.0297 21.2813C84.957 25.5838 80.8191 43.507 91.5815 53.5431L125.124 84.822ZM213.889 254.193C203.126 244.157 185.535 249.535 182.225 263.873L171.908 308.561C168.598 322.9 182.051 335.445 196.123 331.143L239.983 317.733C254.056 313.431 258.194 295.508 247.431 285.472L213.889 254.193ZM331.142 142.89C335.444 156.963 322.899 170.416 308.56 167.105L263.872 156.788C249.534 153.478 244.156 135.887 254.192 125.125L285.471 91.582C295.507 80.8196 313.43 84.9575 317.732 99.0302L331.142 142.89ZM84.8211 213.888C94.8572 203.126 89.4791 185.535 75.1405 182.225L30.4523 171.908C16.1138 168.597 3.56867 182.05 7.87113 196.123L21.2804 239.983C25.5828 254.055 43.506 258.193 53.5421 247.431L84.8211 213.888ZM264.977 36.3923C277.97 43.301 278.612 61.6844 266.132 69.4825L227.238 93.7866C214.758 101.585 198.517 92.949 198.003 78.2422L196.402 32.4065C195.889 17.6997 211.488 7.95204 224.482 14.8607L264.977 36.3923ZM141.01 260.771C140.496 246.064 124.255 237.428 111.775 245.226L72.8804 269.53C60.4007 277.328 61.0427 295.712 74.0359 302.62L114.531 324.152C127.524 331.061 143.124 321.313 142.61 306.606L141.01 260.771ZM302.62 264.977C295.712 277.971 277.328 278.613 269.53 266.133L245.226 227.238C237.428 214.759 246.064 198.517 260.771 198.004L306.606 196.403C321.313 195.889 331.061 211.489 324.152 224.482L302.62 264.977ZM78.2427 141.009C92.9494 140.496 101.585 124.254 93.7871 111.774L69.483 72.8799C61.6849 60.4002 43.3014 61.0422 36.3928 74.0354L14.8611 114.531C7.95254 127.524 17.7002 143.123 32.407 142.61L78.2427 141.009Z', 
        'M115.385 30.9509C80.1116 31.4121 47.8189 54.7608 37.5949 90.4163L19.7611 152.61C5.39137 182.645 10.2867 219.707 34.7742 245.064L77.3027 289.104C95.9655 318.76 132.393 334.178 168.013 324.634L224.845 309.406C260.11 308.936 292.393 285.589 302.615 249.94L320.444 187.763C334.822 157.726 329.929 120.656 305.438 95.295L262.888 51.2334C244.22 21.5935 207.803 6.18745 172.193 15.7291L115.385 30.9509ZM222.316 91.6932L198.671 98.0289C173.753 104.706 148.459 99.7715 128.534 86.5429L121.777 110.108C114.743 134.638 97.7809 153.631 76.5063 163.976L93.9186 182.007C111.776 200.499 119.73 224.906 117.896 248.668L141.536 242.334C166.454 235.657 191.749 240.591 211.674 253.821L218.433 230.249C225.467 205.719 242.429 186.726 263.703 176.381L246.293 158.353C228.436 139.861 220.482 115.454 222.316 91.6932Z',
        'M142.99 56.5094C142.99 71.1502 154.859 83.0189 169.5 83.0189C184.141 83.0189 196.009 71.1502 196.009 56.5094C196.009 41.8687 184.141 30 169.5 30C154.859 30 142.99 41.8687 142.99 56.5094ZM142.99 284.491C142.99 299.132 154.859 311 169.5 311C184.14 311 196.009 299.132 196.009 284.491C196.009 269.85 184.14 257.981 169.5 257.981C154.859 257.981 142.99 269.85 142.99 284.491ZM256.981 170.5C256.981 155.86 268.85 143.991 283.49 143.991C298.131 143.991 310 155.86 310 170.5C310 185.141 298.131 197.01 283.49 197.01C268.85 197.01 256.981 185.141 256.981 170.5ZM55.5094 143.991C40.8687 143.991 29 155.86 29 170.5C29 185.141 40.8687 197.01 55.5094 197.01C70.1502 197.01 82.0189 185.141 82.0189 170.5C82.0189 155.86 70.1502 143.991 55.5094 143.991ZM231.358 108.641C221.006 98.2889 221.006 81.5041 231.358 71.1515C241.711 60.7989 258.496 60.7989 268.848 71.1515C279.201 81.5041 279.201 98.2889 268.848 108.641C258.496 118.994 241.711 118.994 231.358 108.641ZM70.1515 232.359C59.799 242.711 59.799 259.496 70.1515 269.849C80.5041 280.201 97.289 280.201 107.642 269.849C117.994 259.496 117.994 242.711 107.642 232.359C97.289 222.006 80.5041 222.006 70.1515 232.359ZM231.358 232.359C241.71 222.006 258.495 222.006 268.848 232.359C279.2 242.711 279.2 259.496 268.848 269.849C258.495 280.201 241.71 280.201 231.358 269.849C221.005 259.496 221.005 242.711 231.358 232.359ZM107.642 71.1517C97.2892 60.7991 80.5044 60.7991 70.1518 71.1517C59.7992 81.5043 59.7992 98.2891 70.1518 108.642C80.5044 118.994 97.2892 118.994 107.642 108.642C117.994 98.2891 117.994 81.5043 107.642 71.1517Z', 
        // Add more paths here
      ];
      
      const topShapes = [
        'M104 66C104 87.5391 86.5391 105 65 105C43.4609 105 26 87.5391 26 66C26 44.4609 43.4609 27 65 27C86.5391 27 104 44.4609 104 66Z', 
        'M65.5 17.2041C74.3247 17.2041 82.0298 22.0084 86.1533 29.1496C94.3857 29.1581 102.39 33.4435 106.802 41.1027C111.214 48.7619 110.915 57.8514 106.806 65.0009C110.916 72.1505 111.215 81.2402 106.802 88.8996C102.39 96.5591 94.3855 100.844 86.1528 100.853C82.0292 107.993 74.3244 112.797 65.5 112.797C56.6755 112.797 48.9706 107.993 44.8471 100.852C36.6147 100.844 28.6109 96.5585 24.1987 88.8993C19.7863 81.2401 20.0852 72.1504 24.1942 65.0009C20.0855 57.8514 19.7867 48.762 24.199 41.1029C28.6111 33.444 36.6145 29.1586 44.8466 29.1499C48.9701 22.0085 56.6752 17.2041 65.5 17.2041Z', 
        // Add more paths here
      ];
     
      // Global variables
      let formattedTime = '';
      let baseTemperature = 0;
      let lastApiCall = 0;
      let baseColor = '#F8C433'; // example value
      let midColor = '#F8C433'; // example value
      let topColor = '#F8C433'; // example value
      let conditionText = 'Sunny'; //default
      let conditionCode = '1000'; //default
        let minTemp = '0';
        let maxTemp = '100';
    
    
      
    const colorPalette = ['#2E5DB9', '#C03A83', '#FF69B4', '#BAE8E8', '#C299F6', '#F8C433', '#EF744A',]; // Your defined color palette
      
      
    // Fetch weather data function using WeatherAPI.com for both temperature and condition code
    async function fetchWeather() {
        const now = Date.now();
        if (now - lastApiCall < 60000) {
            console.log('Weather API call rate limit exceeded. Skipping API call.');
            return;
        }
    
        // Set current date and time to New York (Eastern Time)
        const nyOptions = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' };
        const nyNow = new Date().toLocaleString('en-US', nyOptions);
        const [month, day, year] = nyNow.split('/');
    
        // Calculate yesterday’s date in New York timezone
        const nyYesterday = new Date(`${year}-${month}-${day}T00:00:00-05:00`);
        nyYesterday.setDate(nyYesterday.getDate() - 1);
        const formattedDate = nyYesterday.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    
        const historicalUrl = `https://api.weatherapi.com/v1/history.json?key=42f615a5849c457bb82193942241009&q=11222&dt=${formattedDate}`;
        const currentUrl = `https://api.weatherapi.com/v1/current.json?key=42f615a5849c457bb82193942241009&q=11222`;
    
        try {
            // Fetch historical weather data to set the range for temperature
            const historicalResponse = await fetch(historicalUrl);
            const historicalData = await historicalResponse.json();
    
            // Get historical min/max temperatures and apply a buffer
            minTemp = historicalData.forecast.forecastday[0].day.mintemp_f;
            maxTemp = historicalData.forecast.forecastday[0].day.maxtemp_f;
            const tempBuffer = 0; // Add a buffer to min/max temperatures
            baseMinTemp = minTemp - tempBuffer;
            baseMaxTemp = maxTemp + tempBuffer;
    
            // Fetch current weather data for both temperature and condition code
            const currentResponse = await fetch(currentUrl);
            const currentData = await currentResponse.json();
    
            // Current temperature and condition code
            baseTemperature = currentData.current.temp_f; // Use current temperature
            conditionText = currentData.current.condition.text; // "Sunny", "Partly Cloudy", etc.
            conditionCode = currentData.current.condition.code; // Get condition code
    
            // Adjust the range if current temperature goes beyond the range
            if (baseTemperature < baseMinTemp) {
                baseMinTemp = baseTemperature;
            }
            if (baseTemperature > baseMaxTemp) {
                baseMaxTemp = baseTemperature;
            }
    
            // Log the condition code and mapped color
            const conditionColor = getConditionColor(conditionCode);
    
            updateColor(conditionText, conditionColor); // Call updateColor with the current weather and condition code
            updateHeadline(); // Update headline with current weather data
            lastApiCall = now;
    
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
    
    
    // Function to map condition codes to color (based on the range 1000 to 1282)
    function getConditionColor(conditionCode) {
        const minConditionCode = 1000;
        const maxConditionCode = 1282;
    
        // Normalize condition code to fit the color palette range
        conditionCode = Math.max(minConditionCode, Math.min(conditionCode, maxConditionCode));
    
        // Use the normalized condition code as input for color palette mapping
        return getColorFromPalette(conditionCode, minConditionCode, maxConditionCode);
    }
    
    
    
    
    
    
    // Function to map a value (temperature) to a color from the color palette
    function getColorFromPalette(value, minValue, maxValue) {
        const range = maxValue - minValue;
        const segmentSize = range / colorPalette.length;
        const index = Math.max(0, Math.min(Math.floor((value - minValue) / segmentSize), colorPalette.length - 1));
        return colorPalette[index];
    }
    
    // Function to map the current temperature to a color based on the dynamic historical min/max range
    function getBaseColor(temp) {
        temp = Math.max(baseMinTemp, Math.min(temp, baseMaxTemp)); // Clamp current temp between the historical range
        return getColorFromPalette(temp, baseMinTemp, baseMaxTemp); // Use historical range for color palette
    }
    
      
    // Function to map condition code to color using category numbers
    function getMidColor(conditionCode) {
      
        
        // Map condition code to a category number (e.g., 1, 2, 3, etc.)
        const categoryNumber = mapConditionToCategory(conditionCode);
        
      
        
        // Use the category number to get a color from the palette
        const color = getColorFromPalette(categoryNumber, 1, 6); // Adjust range based on number of categories
        
    
        
        return color;
    }
    
    function mapConditionToCategory(conditionCode) {
        if (conditionCode === 1000) {
            return '6'; // Clear/Sunny
        } else if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) {
            return '3'; //rain
        } else if ([1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(conditionCode)) {
            return '4'; //snow
        } else if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
            return '1'; //cloudy
        } else if ([1087, 1273, 1276, 1279, 1282, 1198, 1201].includes(conditionCode)) {
            return '5'; //storm
        } else {
            return '2'; //unknown
        }
    }
      
      // Function to map minutes of the hour to color (0 to 59)
      function getTopColor(minutes) {
          return getColorFromPalette(minutes, 0, 59);
      }
      
      function updateColor() {
        // Set current date and time to New York (Eastern Time)
        const nyOptions = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false };
        const nyNow = new Date().toLocaleString('en-US', nyOptions);
        const nyMinutes = parseInt(nyNow.split(':')[1], 10); // Get minutes from New York time
    
        // Get colors based on the updated logic
        baseColor = getBaseColor(baseTemperature);
        midColor = getMidColor(conditionCode);
        topColor = getTopColor(nyMinutes);
    
        // Create and update the flower
        flowerContainer = createFlower(baseColor, midColor, topColor);
        document.getElementById('flowerContainer').innerHTML = '';
        document.getElementById('flowerContainer').appendChild(flowerContainer);
    
        updateHeadline(); // Update headline with the current information
    }
    
      
      // Initial fetch and interval setup
      fetchWeather();
      setInterval(fetchWeather, 60000); // Fetch every minute
      
    
        function getRandomItem(items) {
          const index = Math.floor(Math.random() * items.length);
          return items[index];
        }
      
      
      
        function createFlower(baseColor, midColor, topColor) {
        const baseShape = getRandomItem(baseShapes);
        const midShape = getRandomItem(midShapes);
        const topShape = getRandomItem(topShapes);
    
        const flowerContainer = document.createElement('div');
        flowerContainer.classList.add('flower-container');
    
        // SVG definitions with radial gradient applied to the base shape
        const baseSvg = `
            <svg id="base" class="base" viewBox="0 0 550 550">
                <defs>
                    <radialGradient id="baseGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="10%" stop-color="white" />
                        <stop offset="50%" stop-color="${baseColor}" />
                    </radialGradient>
                </defs>
                <path d="${baseShape}" fill="url(#baseGradient)" pointer-events="none" fill-rule="evenodd"/>
            </svg>`;
    
        const midSvg = `
            <svg id="mid" class="mid" viewBox="0 0 340 340">
                <path d="${midShape}" fill="${midColor}" pointer-events="none" fill-rule="evenodd"/>
            </svg>`;
    
        const topSvg = `
            <svg id="top" class="top" viewBox="0 0 130 130">
                <path d="${topShape}" fill="${topColor}" pointer-events="none" fill-rule="evenodd"/>
            </svg>`;
    
        flowerContainer.innerHTML = baseSvg + midSvg + topSvg;
    
        // Append to the document to make sure it's visible
        document.body.appendChild(flowerContainer);
    
        return flowerContainer;
    }
    
    
    
    function updateHeadline() {
        const now = new Date();
        const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        
        const hours = nyTime.getHours();
        const minutes = nyTime.getMinutes();
        const isPM = hours >= 12;
        const formattedHours = String(hours % 12 || 12).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const period = isPM ? 'PM' : 'AM';
    
        // Update global formattedTime
        formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    
        const headlineText = document.getElementById('headline-text');
        if (headlineText) {
            headlineText.innerHTML = `
                Flower based on current weather in Brooklyn<br>
                <span id="time-display">${formattedTime}</span><br>
                <span id="temperature-display">${baseTemperature.toFixed(0)} °F</span><br>
                <span id="condition-display">${conditionText}</span>
            `;
        }
    }
      
          function setupHoverEffects() {
              const container = document.getElementById('container'); // Parent element
      
              container.addEventListener('mouseover', (event) => {
                  const target = event.target;
      
                  if (target.classList.contains('base')) {
                      
                      const headlineText = document.getElementById('headline-text');
                      if (headlineText) {
                          headlineText.innerHTML = `
                        
                      <span id="time-display" class="hidden">${formattedTime}</span><br>
                      <span id="temperature-display" class="visible" style="font-weight: bold; color: black;">
                          ${baseTemperature.toFixed(0)} °F — 
                          <span style="display:inline-block; width: 0.7em; height: 0.7em; background-color: ${baseColor};"></span> 
                          ${midColor}
                      </span><br>
                      <span id="context" class="visible">Mapped between the high (${maxTemp.toFixed(0)}°F) and low (${minTemp.toFixed(0)}°F) of yesterday's weather.</span>
                      <span id="condition-display" class="hidden">${conditionText}</span>
                  `;
                          
                      }
                  } else if (target.classList.contains('mid')) {
                     
                      const headlineText = document.getElementById('headline-text');
                      if (headlineText) {
                          headlineText.innerHTML = `
                               
                      <span id="time-display" class="hidden">${formattedTime}</span><br>
                      <span id="temperature-display" class="hidden">${baseTemperature.toFixed(0)} °F</span><br>
                      <span id="condition-display" class="visible" style="font-weight: bold; color: black;">
                          ${conditionText} —
                          <span style="display:inline-block; width: 0.7em; height: 0.7em; background-color: ${midColor};"></span> 
                          ${midColor}
                      </span><br>
                      <span id="context" class="visible">Influenced by current weather condition code (${conditionCode})</span>
                  `;
                         
                      }
                  } else if (target.classList.contains('top')) {
                     
                      const headlineText = document.getElementById('headline-text');
                      if (headlineText) {
                          headlineText.innerHTML = `
                            
                      <span id="time-display" class="visible" style="font-weight: bold; color: black;">${formattedTime} —
                           <span style="display:inline-block; width: 0.7em; height: 0.7em; background-color: ${topColor};"></span> 
                          ${topColor}</span><br>
                      
                      <span id="context" class="visible">Influenced by the current minute of the hour</span><br>
                      <span id="temperature-display" class="hidden">${baseTemperature.toFixed(0)} °F</span><br>
                      <span id="condition-display" class="hidden">${conditionText}</span><br>
                      <span style="font-weight: bold; color: black;"></span>
                  `;
                       
                      }
                  }
              });
      
              container.addEventListener('mouseout', (event) => {
                  const target = event.target;
      
                  if (target.classList.contains('base') || 
                      target.classList.contains('mid') || 
                      target.classList.contains('top')) {
                      console.log('mouseout');
                      updateHeadline(); // Reset to original content
                  }
              });
          }
      
          // Initialize the functions
          updateHeadline();
          setupHoverEffects();




          document.addEventListener('DOMContentLoaded', function() {
            const caseStudyContainer = document.getElementById('case-study-container');
            const mainContent = document.getElementById('main-content');
          
            // Event listener for custom event from project-thumbnail
            document.addEventListener('case-study-click', function(e) {
              const studyId = e.detail.studyId;
              
              // Load the case study content based on the studyId
              loadCaseStudy(studyId);
          
              // Scroll to the top of the page
              window.scrollTo(0, 0);
          
              // Show the case study container
              caseStudyContainer.style.display = 'block';
          
              // Push the new state to the browser history
              const caseStudyTitle = `Case Study ${studyId}`;
              const newURL = `${window.location.origin}${window.location.pathname}?${caseStudyTitle}`;
              window.history.pushState({ studyId: studyId }, caseStudyTitle, newURL);
          
              // Update the page title for SEO
              document.title = `${caseStudyTitle} | My Portfolio`;
            });
          
            // Function to load case study content dynamically
            function loadCaseStudy(studyId) {
              const caseStudyFile = `case-studies/case-study-${studyId}.html`;
          
              // Fetch the case study content from the external HTML file
              fetch(caseStudyFile)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.text();  // Return the HTML as text
                })
                .then(data => {
                  // Insert the fetched HTML content into the caseStudyContainer
                  caseStudyContainer.innerHTML = data;
          
                  // Scroll to the top of the page
                  window.scrollTo(0, 0);
          
                  // Display the case study container
                  caseStudyContainer.style.display = 'block';
                })
                .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
                });
            }
          
            // Detect scrolling to remove case study content when user scrolls past it
            window.addEventListener('scroll', function() {
              const caseStudyHeight = caseStudyContainer.offsetHeight;
          
              // If the user scrolls past the case study content, hide it and remove the content
              if (window.scrollY > caseStudyHeight) {
                caseStudyContainer.style.display = 'none';
                caseStudyContainer.innerHTML = '';  // Unload the case study content
          
                // Optionally, reset the URL back to the main content
                const newURL = `${window.location.origin}${window.location.pathname}`;
                window.history.pushState(null, 'Main Content | My Portfolio', newURL);
          
                // Reset the page title
                document.title = 'Main Content | My Portfolio';
              }
            });
          
            // Handle back/forward navigation
            window.addEventListener('popstate', function(event) {
              if (event.state && event.state.studyId) {
                // Reload the corresponding case study based on the state
                loadCaseStudy(event.state.studyId);
                caseStudyContainer.style.display = 'block';
              } else {
                // If there is no state (e.g., navigating back to main content), clear the case study
                caseStudyContainer.style.display = 'none';
                caseStudyContainer.innerHTML = '';
                
                // Scroll to the top
                window.scrollTo(0, 0);
                
                // Update the URL and title for the main content
                document.title = 'Main Content | My Portfolio';
              }
            });
          });
          
