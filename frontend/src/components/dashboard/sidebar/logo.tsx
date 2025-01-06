"use client";

import Link from "next/link";



export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center font-extrabold xl:gap-2 text-3xl transition-all duration-300"
    >
      <svg
      
        className=" bg-yellow-100 rounded-2xl"
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        zoomAndPan="magnify"
        viewBox="0 0 375 374.999991"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <defs>
          <clipPath id="738ec158d6">
            <path
              d="M 51 50.875 L 323.875 50.875 L 323.875 323.875 L 51 323.875 Z M 51 50.875 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <rect
          x="-37.5"
          width="450"
          fill="#ffffff"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
        <rect
          x="-37.5"
          width="450"
          fill="#ffffff"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
        <rect
          className="fill-primary-color"
          x="-37.5"
          width="450"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
        <g clipPath="url(#738ec158d6)">
          <path
            fill="#ffffff"
            d="M 80.824219 259.21875 C 77.050781 255.449219 73.59375 251.410156 70.453125 247.097656 C 67.316406 242.785156 64.535156 238.25 62.117188 233.5 C 59.695312 228.746094 57.660156 223.835938 56.015625 218.761719 C 54.371094 213.6875 53.132812 208.515625 52.304688 203.246094 C 50.742188 193.378906 50.625 183.496094 51.953125 173.597656 C 53.195312 168.859375 55.035156 164.371094 57.472656 160.125 C 59.910156 155.882812 62.863281 152.03125 66.328125 148.574219 L 105.382812 109.519531 C 106.425781 108.480469 107.507812 107.480469 108.632812 106.527344 C 109.753906 105.574219 110.914062 104.664062 112.109375 103.804688 C 113.304688 102.941406 114.535156 102.128906 115.792969 101.363281 C 117.054688 100.597656 118.34375 99.886719 119.660156 99.226562 C 120.976562 98.5625 122.320312 97.953125 123.683594 97.398438 C 125.050781 96.847656 126.4375 96.347656 127.839844 95.902344 C 129.246094 95.457031 130.667969 95.070312 132.105469 94.738281 C 133.539062 94.40625 134.988281 94.132812 136.445312 93.917969 C 137.902344 93.703125 139.367188 93.546875 140.839844 93.445312 C 142.308594 93.347656 143.78125 93.308594 145.253906 93.324219 C 146.730469 93.34375 148.199219 93.421875 149.667969 93.554688 C 151.136719 93.691406 152.59375 93.882812 154.046875 94.136719 C 155.5 94.386719 156.941406 94.699219 158.367188 95.0625 C 159.796875 95.429688 161.207031 95.851562 162.601562 96.332031 C 163.996094 96.8125 165.367188 97.34375 166.71875 97.933594 C 168.070312 98.519531 169.394531 99.160156 170.695312 99.855469 C 177.523438 102.917969 193.097656 113.191406 206.125 126.117188 C 197.882812 118.488281 159.65625 112.804688 144.066406 126.492188 L 137.113281 133.441406 C 107.171875 163.378906 107.171875 212.160156 137.113281 242.121094 C 137.113281 242.121094 184.453125 297.914062 230.5 303.636719 C 238.25 304.605469 246.117188 302.460938 253.613281 300.101562 C 251.347656 302.015625 249 303.824219 246.578125 305.535156 C 244.152344 307.242188 241.660156 308.839844 239.09375 310.332031 C 236.53125 311.820312 233.90625 313.195312 231.222656 314.457031 C 228.539062 315.71875 225.804688 316.859375 223.023438 317.882812 C 220.238281 318.90625 217.414062 319.804688 214.554688 320.582031 C 211.691406 321.355469 208.800781 322.003906 205.882812 322.527344 C 202.960938 323.050781 200.027344 323.449219 197.074219 323.714844 C 194.121094 323.980469 191.160156 324.117188 188.195312 324.128906 C 185.230469 324.136719 182.269531 324.015625 179.3125 323.765625 C 176.359375 323.515625 173.421875 323.136719 170.5 322.628906 C 167.578125 322.121094 164.683594 321.488281 161.816406 320.730469 C 158.949219 319.972656 156.121094 319.089844 153.332031 318.082031 C 150.542969 317.074219 147.804688 315.949219 145.113281 314.703125 C 142.421875 313.457031 139.789062 312.097656 137.214844 310.621094 C 134.644531 309.144531 132.140625 307.5625 129.707031 305.867188 C 127.273438 304.171875 124.917969 302.375 122.640625 300.476562 C 120.3125 298.53125 118.0625 296.472656 115.886719 294.292969 Z M 144.496094 71.359375 C 190.546875 77.082031 237.886719 132.878906 237.886719 132.878906 C 267.824219 162.816406 267.824219 211.597656 237.886719 241.558594 L 230.9375 248.507812 C 213.871094 263.007812 177.105469 256.515625 168.878906 248.894531 C 181.90625 261.820312 197.453125 272.097656 204.308594 275.160156 C 205.609375 275.851562 206.933594 276.492188 208.285156 277.082031 C 209.636719 277.667969 211.007812 278.203125 212.402344 278.679688 C 213.796875 279.160156 215.207031 279.582031 216.636719 279.949219 C 218.0625 280.316406 219.503906 280.625 220.957031 280.875 C 222.410156 281.125 223.867188 281.320312 225.335938 281.453125 C 226.804688 281.589844 228.273438 281.667969 229.75 281.683594 C 231.222656 281.703125 232.695312 281.660156 234.164062 281.5625 C 235.636719 281.460938 237.101562 281.304688 238.558594 281.089844 C 240.015625 280.871094 241.464844 280.597656 242.898438 280.265625 C 244.335938 279.9375 245.757812 279.546875 247.160156 279.101562 C 248.566406 278.660156 249.953125 278.160156 251.316406 277.605469 C 252.683594 277.046875 254.023438 276.441406 255.339844 275.777344 C 256.660156 275.117188 257.945312 274.402344 259.207031 273.636719 C 260.46875 272.875 261.695312 272.058594 262.890625 271.199219 C 264.085938 270.335938 265.246094 269.425781 266.367188 268.472656 C 267.492188 267.515625 268.574219 266.519531 269.617188 265.476562 L 308.675781 226.425781 C 312.136719 222.96875 315.085938 219.117188 317.523438 214.875 C 319.964844 210.632812 321.804688 206.144531 323.046875 201.414062 C 324.375 191.515625 324.257812 181.632812 322.699219 171.769531 C 321.871094 166.5 320.632812 161.328125 318.984375 156.253906 C 317.339844 151.179688 315.304688 146.269531 312.882812 141.515625 C 310.460938 136.761719 307.683594 132.230469 304.542969 127.917969 C 301.40625 123.605469 297.949219 119.5625 294.171875 115.796875 L 259.101562 80.710938 C 256.933594 78.535156 254.683594 76.46875 252.347656 74.511719 C 250.070312 72.613281 247.714844 70.816406 245.28125 69.121094 C 242.847656 67.425781 240.34375 65.84375 237.769531 64.367188 C 235.199219 62.890625 232.566406 61.53125 229.875 60.285156 C 227.183594 59.039062 224.445312 57.914062 221.65625 56.90625 C 218.867188 55.898438 216.039062 55.015625 213.171875 54.257812 C 210.304688 53.5 207.410156 52.863281 204.488281 52.359375 C 201.566406 51.851562 198.628906 51.472656 195.671875 51.222656 C 192.71875 50.972656 189.757812 50.851562 186.792969 50.859375 C 183.828125 50.871094 180.867188 51.007812 177.914062 51.273438 C 174.960938 51.539062 172.023438 51.9375 169.105469 52.460938 C 166.1875 52.984375 163.296875 53.632812 160.433594 54.40625 C 157.574219 55.183594 154.75 56.082031 151.964844 57.105469 C 149.183594 58.128906 146.449219 59.269531 143.765625 60.53125 C 141.082031 61.789062 138.457031 63.167969 135.894531 64.65625 C 133.328125 66.148438 130.835938 67.746094 128.410156 69.453125 C 125.988281 71.164062 123.640625 72.972656 121.375 74.886719 C 128.882812 72.542969 136.75 70.398438 144.496094 71.359375 Z M 144.496094 71.359375 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </svg>
      <div className=" text-xl 2xl:text-3xl flex flex-col xl:flex-row xl:gap-1 ">
        <span className="text-primary-color hidden xl:flex">Orga</span>
        <span className="text-default-600 hidden xl:flex ">File</span>
      </div>
    </Link>
  );
}
