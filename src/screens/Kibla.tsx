import * as Location from "expo-location";
import { DeviceMotion, Magnetometer } from "expo-sensors";
import LPF from "lpf";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import useTranslation from "../hooks/useTranslation";
import { Fonts } from "../styles";
import { TextBox, ViewBox } from "../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CompassSvg({ svgStyle }: { svgStyle?: any }) {
  const svgMarkup = `<svg width="394" height="394" viewBox="0 0 394 394" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_627_612)">
  <path d="M197 56.9616L210.596 84.3936H183.403L197 56.9616Z" fill="#090E1B"/>
  <path d="M270.716 270.716C311.428 230.004 311.428 163.996 270.716 123.284C230.004 82.572 163.996 82.572 123.284 123.284C82.572 163.996 82.572 230.004 123.284 270.716C163.996 311.428 230.004 311.428 270.716 270.716Z" stroke="#090E1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M123.505 123.505L130.323 130.323M263.677 263.677L270.495 270.495M123.505 270.495L130.323 263.677M263.677 130.323L270.495 123.505" stroke="#090E1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M93.0623 197L97 197M297 197L300.938 197M197 300.938L197 297M197 97.5L197 93.0622" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M96.6038 223.901L100.407 222.882M293.593 171.118L297.396 170.099M223.901 297.396L222.882 293.593M171.248 100.89L170.099 96.6038" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M106.987 248.969L110.398 247M283.603 147L287.013 145.031M248.969 287.013L247 283.602M147.25 110.83L145.031 106.987" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M145.031 287.013L147 283.603M247 110.397L248.969 106.987M287.013 248.969L283.603 247M110.831 147.25L106.987 145.031" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M170.099 297.396L171.118 293.593M222.882 100.407L223.901 96.6037M297.396 223.901L293.593 222.882M100.891 171.247L96.604 170.099" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M197 230.448L180.276 197L197 163.552L213.724 197L197 230.448Z" stroke="#56791D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M135.099 254.37L133.713 252.984L143.938 242.76L145.324 244.145L142.453 258.245L142.071 257.863L150.556 249.378L151.942 250.764L141.718 260.989L140.332 259.603L143.202 245.503L143.584 245.885L135.099 254.37Z" fill="#090E1B"/>
  <path opacity="0.4" d="M252.656 148.319C252.071 148.903 251.411 149.271 250.676 149.422C249.94 149.572 249.186 149.506 248.413 149.224C247.63 148.931 246.89 148.436 246.193 147.739C245.542 147.088 245.094 146.405 244.849 145.688C244.585 144.972 244.529 144.264 244.679 143.567C244.821 142.86 245.17 142.19 245.726 141.559L247.126 142.959C246.655 143.506 246.447 144.09 246.504 144.712C246.56 145.335 246.876 145.933 247.451 146.508C248.092 147.149 248.757 147.512 249.445 147.597C250.124 147.692 250.718 147.484 251.227 146.975C251.642 146.56 251.859 146.108 251.878 145.617C251.887 145.137 251.708 144.599 251.34 144.005L250.053 141.926C249.403 140.899 249.101 139.946 249.148 139.07C249.177 138.193 249.549 137.396 250.266 136.68C250.878 136.067 251.562 135.685 252.316 135.534C253.061 135.374 253.829 135.444 254.621 135.746C255.404 136.038 256.158 136.548 256.884 137.274C257.572 137.962 258.067 138.683 258.369 139.437C258.652 140.192 258.732 140.932 258.609 141.658C258.468 142.384 258.129 143.053 257.591 143.666L256.177 142.252C256.658 141.752 256.851 141.163 256.757 140.484C256.653 139.814 256.281 139.159 255.64 138.518C254.961 137.839 254.272 137.453 253.575 137.358C252.868 137.255 252.264 137.453 251.765 137.952C251.359 138.358 251.142 138.801 251.114 139.282C251.086 139.763 251.26 140.305 251.637 140.908L252.938 142.973C253.58 143.991 253.881 144.953 253.844 145.858C253.787 146.763 253.391 147.583 252.656 148.319Z" fill="#090E1B"/>
  <path opacity="0.4" d="M253.136 260.135L239.871 252.951L241.313 251.508L249.431 255.892C249.77 256.081 250.119 256.288 250.477 256.515C250.836 256.741 251.246 257.01 251.708 257.321C251.378 256.821 251.114 256.397 250.916 256.048C250.727 255.69 250.534 255.336 250.336 254.987L246.023 246.799L247.522 245.3L255.696 249.627C256.054 249.816 256.417 250.019 256.785 250.235C257.153 250.452 257.563 250.712 258.015 251.013C257.676 250.485 257.398 250.047 257.181 249.698C256.973 249.34 256.79 249.015 256.629 248.722L252.245 240.576L253.659 239.162L260.801 252.47L259.472 253.799L248.908 248.185L254.494 258.777L253.136 260.135Z" fill="#090E1B"/>
  <path opacity="0.4" d="M134.062 140.667L140.299 134.43L150.524 144.655L144.287 150.891L143.014 149.619L148.501 144.131L148.417 145.319L144.669 141.572L140.299 145.942L139.069 144.711L143.439 140.341L139.62 136.523L140.836 136.466L135.349 141.953L134.062 140.667Z" fill="#090E1B"/>
  </g>
  <defs>
  <clipPath id="clip0_627_612">
  <rect width="278" height="278" fill="white" transform="translate(0.424316 197) rotate(-45)"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={svgMarkup} width={301} height={301} style={svgStyle} />;
}

function MeccaSvg({ svgColor }: { svgColor?: any }) {
  const svgMarkup = `<svg width=${svgColor ? "58" : "52"}  height=${
    svgColor ? "61" : "55"
  } viewBox="0 0 52 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 22L26 34L4 22" stroke=${svgColor || "#56791D"} stroke-width="2"/>
  <path d="M25.9999 1.78479L48.2044 14.6046V40.2441L25.9999 53.0638L3.7954 40.2441V14.6046L25.9999 1.78479Z" stroke=${
    svgColor || "#090E1B"
  } stroke-width="2"/>
  </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}

function RotatePhoneSvg() {
  const svgMarkup = `<svg width="271" height="114" viewBox="0 0 271 114" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.2408 17.3056L16.6863 16.7511L17.2408 17.3056ZM95.9713 17.3056L96.5258 16.7511L95.9713 17.3056ZM17.2408 96.0361L16.6863 96.5907L17.2408 96.0361ZM95.9713 96.0361L95.4168 95.4816L95.9713 96.0361ZM253.694 17.3056L254.249 16.7511L253.694 17.3056ZM174.964 17.3056L175.517 17.862L175.518 17.8601L174.964 17.3056ZM253.694 96.0361L254.249 96.5907L253.694 96.0361ZM174.964 96.0361L175.518 95.4816L175.517 95.4797L174.964 96.0361ZM165.057 27.1469L165.61 27.7033L165.057 27.1469ZM105.813 86.1948L105.258 85.6403L105.813 86.1948ZM110.733 81.2741L101.986 83.6178L108.39 90.0209L110.733 81.2741ZM160.656 32.6239L162.425 30.8666L161.32 29.7538L159.551 31.5112L160.656 32.6239ZM163.841 29.4607L165.61 27.7033L164.504 26.5906L162.735 28.3479L163.841 29.4607ZM165.61 27.7033L169.148 24.1885L168.043 23.0758L164.504 26.5906L165.61 27.7033ZM171.978 21.3767L175.517 17.862L174.411 16.7492L170.873 20.264L171.978 21.3767ZM175.518 17.8601C176.434 16.9447 177.373 16.0685 178.335 15.2314L177.305 14.0484C176.316 14.9092 175.35 15.8101 174.409 16.7511L175.518 17.8601ZM180.713 13.2754C182.763 11.6836 184.899 10.2573 187.104 8.99645L186.325 7.63493C184.057 8.93216 181.859 10.3994 179.751 12.0367L180.713 13.2754ZM189.818 7.54419C192.129 6.39085 194.505 5.41069 196.925 4.60373L196.429 3.1158C193.939 3.94592 191.495 4.95426 189.118 6.14084L189.818 7.54419ZM199.872 3.71249C202.356 3.037 204.878 2.53897 207.418 2.21841L207.222 0.66232C204.609 0.991992 202.015 1.50422 199.461 2.19903L199.872 3.71249ZM210.483 1.91832C213.044 1.73952 215.615 1.73952 218.176 1.91832L218.285 0.353696C215.651 0.169813 213.007 0.169813 210.373 0.353694L210.483 1.91832ZM221.24 2.21841C223.78 2.53897 226.302 3.037 228.786 3.71249L229.198 2.19903C226.643 1.50422 224.049 0.991995 221.437 0.662323L221.24 2.21841ZM231.733 4.60373C234.154 5.41069 236.529 6.39085 238.84 7.5442L239.54 6.14084C237.163 4.95426 234.719 3.94592 232.229 3.11581L231.733 4.60373ZM241.555 8.99646C243.76 10.2573 245.896 11.6836 247.945 13.2754L248.907 12.0367C246.799 10.3994 244.602 8.93216 242.333 7.63493L241.555 8.99646ZM250.323 15.2314C251.285 16.0685 252.224 16.9447 253.14 17.8601L254.249 16.7511C253.308 15.8101 252.342 14.9092 251.353 14.0484L250.323 15.2314ZM253.14 17.8601C254.055 18.7755 254.932 19.7151 255.769 20.6769L256.952 19.6471C256.091 18.6581 255.19 17.6921 254.249 16.7511L253.14 17.8601ZM257.725 23.055C259.316 25.1044 260.743 27.2405 262.004 29.4454L263.365 28.6667C262.068 26.3983 260.601 24.2009 258.963 22.0929L257.725 23.055ZM263.456 32.1602C264.609 34.471 265.589 36.8464 266.396 39.2669L267.884 38.7708C267.054 36.2809 266.046 33.8372 264.859 31.4598L263.456 32.1602ZM267.288 42.2141C267.963 44.6977 268.461 47.2197 268.782 49.7598L270.338 49.5635C270.008 46.951 269.496 44.3572 268.801 41.8024L267.288 42.2141ZM269.082 52.8244C269.26 55.3853 269.26 57.9564 269.082 60.5173L270.646 60.6266C270.83 57.9929 270.83 55.3488 270.646 52.7152L269.082 52.8244ZM268.782 63.5819C268.461 66.1221 267.963 68.644 267.288 71.1277L268.801 71.5393C269.496 68.9846 270.008 66.3907 270.338 63.7783L268.782 63.5819ZM266.396 74.0749C265.589 76.4954 264.609 78.8707 263.456 81.1816L264.859 81.882C266.046 79.5045 267.054 77.0609 267.884 74.5709L266.396 74.0749ZM262.004 83.8964C260.743 86.1012 259.316 88.2374 257.725 90.2868L258.963 91.2489C260.601 89.1409 262.068 86.9434 263.365 84.675L262.004 83.8964ZM255.769 92.6649C254.932 93.6266 254.055 94.5662 253.14 95.4816L254.249 96.5907C255.19 95.6497 256.091 94.6836 256.952 93.6946L255.769 92.6649ZM253.14 95.4816C252.224 96.397 251.285 97.2732 250.323 98.1103L251.353 99.2934C252.342 98.4326 253.308 97.5317 254.249 96.5907L253.14 95.4816ZM247.945 100.066C245.896 101.658 243.76 103.084 241.555 104.345L242.333 105.707C244.602 104.41 246.799 102.942 248.907 101.305L247.945 100.066ZM238.84 105.798C236.529 106.951 234.154 107.931 231.733 108.738L232.229 110.226C234.719 109.396 237.163 108.387 239.54 107.201L238.84 105.798ZM228.786 109.629C226.302 110.305 223.78 110.803 221.24 111.123L221.437 112.679C224.049 112.35 226.643 111.838 229.198 111.143L228.786 109.629ZM218.176 111.423C215.615 111.602 213.044 111.602 210.483 111.423L210.373 112.988C213.007 113.172 215.651 113.172 218.285 112.988L218.176 111.423ZM207.418 111.123C204.878 110.803 202.356 110.305 199.872 109.629L199.461 111.143C202.015 111.838 204.609 112.35 207.222 112.679L207.418 111.123ZM196.925 108.738C194.505 107.931 192.129 106.951 189.818 105.798L189.118 107.201C191.495 108.387 193.939 109.396 196.429 110.226L196.925 108.738ZM187.104 104.345C184.899 103.084 182.763 101.658 180.713 100.066L179.751 101.305C181.859 102.942 184.057 104.41 186.325 105.707L187.104 104.345ZM178.335 98.1103C177.373 97.2732 176.434 96.397 175.518 95.4816L174.409 96.5906C175.35 97.5316 176.316 98.4325 177.305 99.2934L178.335 98.1103ZM175.517 95.4797L173.029 93.0083L171.923 94.121L174.411 96.5925L175.517 95.4797ZM171.038 91.0311L166.062 86.0881L164.957 87.2008L169.933 92.1438L171.038 91.0311ZM164.072 84.1109L161.584 81.6394L160.479 82.7522L162.967 85.2236L164.072 84.1109ZM110.508 30.7331L108.011 28.2363L106.902 29.3454L109.399 31.8422L110.508 30.7331ZM106.014 26.2389L101.02 21.2453L99.911 22.3544L104.905 27.3479L106.014 26.2389ZM99.0226 19.2479L96.5258 16.7511L95.4168 17.8601L97.9135 20.3569L99.0226 19.2479ZM96.5258 16.7511C95.5848 15.8101 94.6188 14.9092 93.6298 14.0484L92.6 15.2314C93.5618 16.0685 94.5014 16.9447 95.4168 17.8601L96.5258 16.7511ZM91.184 12.0367C89.076 10.3994 86.8786 8.93216 84.6102 7.63493L83.8316 8.99645C86.0364 10.2573 88.1725 11.6836 90.222 13.2754L91.184 12.0367ZM81.8171 6.14084C79.4397 4.95426 76.996 3.94592 74.5061 3.11581L74.01 4.60373C76.4305 5.41069 78.8059 6.39085 81.1167 7.54419L81.8171 6.14084ZM71.4745 2.19903C68.9198 1.50422 66.3259 0.991994 63.7134 0.662321L63.5171 2.21841C66.0572 2.53897 68.5792 3.037 71.0629 3.71249L71.4745 2.19903ZM60.5617 0.353694C57.9281 0.169813 55.284 0.169813 52.6504 0.353695L52.7596 1.91832C55.3205 1.73952 57.8916 1.73952 60.4525 1.91832L60.5617 0.353694ZM49.4986 0.662323C46.8862 0.991996 44.2923 1.50422 41.7376 2.19903L42.1492 3.71249C44.6329 3.03701 47.1548 2.53897 49.695 2.21842L49.4986 0.662323ZM38.706 3.11581C36.216 3.94593 33.7724 4.95427 31.3949 6.14085L32.0954 7.5442C34.4062 6.39086 36.7815 5.4107 39.202 4.60374L38.706 3.11581ZM28.6019 7.63494C26.3335 8.93217 24.136 10.3994 22.028 12.0367L22.9901 13.2754C25.0395 11.6836 27.1757 10.2573 29.3805 8.99646L28.6019 7.63494ZM19.5823 14.0484C18.5933 14.9092 17.6273 15.8101 16.6863 16.7511L17.7953 17.8601C18.7107 16.9447 19.6503 16.0685 20.612 15.2314L19.5823 14.0484ZM16.6863 16.7511C15.7453 17.6921 14.8444 18.6581 13.9835 19.6471L15.1666 20.6769C16.0037 19.7151 16.8799 18.7755 17.7953 17.8601L16.6863 16.7511ZM11.9719 22.0929C10.3346 24.2009 8.86735 26.3983 7.57012 28.6667L8.93164 29.4453C10.1925 27.2405 11.6188 25.1044 13.2106 23.0549L11.9719 22.0929ZM6.07603 31.4598C4.88945 33.8372 3.8811 36.2809 3.05099 38.7708L4.53892 39.2669C5.34588 36.8464 6.32603 34.471 7.47938 32.1602L6.07603 31.4598ZM2.13421 41.8024C1.4394 44.3572 0.927176 46.951 0.597503 49.5635L2.15359 49.7598C2.47415 47.2197 2.97219 44.6977 3.64767 42.2141L2.13421 41.8024ZM0.288875 52.7152C0.104993 55.3488 0.104993 57.9929 0.288874 60.6265L1.8535 60.5173C1.6747 57.9564 1.6747 55.3853 1.8535 52.8244L0.288875 52.7152ZM0.597501 63.7783C0.927173 66.3907 1.4394 68.9846 2.13421 71.5393L3.64767 71.1277C2.97218 68.644 2.47415 66.1221 2.15359 63.5819L0.597501 63.7783ZM3.05099 74.5709C3.8811 77.0609 4.88944 79.5045 6.07602 81.882L7.47937 81.1816C6.32603 78.8707 5.34587 76.4954 4.53891 74.0749L3.05099 74.5709ZM7.57011 84.675C8.86734 86.9434 10.3346 89.1409 11.9719 91.2489L13.2106 90.2868C11.6188 88.2374 10.1925 86.1012 8.93163 83.8964L7.57011 84.675ZM13.9835 93.6946C14.8444 94.6836 15.7453 95.6497 16.6863 96.5907L17.7953 95.4816C16.8799 94.5662 16.0037 93.6266 15.1666 92.6649L13.9835 93.6946ZM16.6863 96.5907C17.6273 97.5317 18.5933 98.4326 19.5823 99.2934L20.612 98.1103C19.6503 97.2732 18.7107 96.397 17.7953 95.4816L16.6863 96.5907ZM22.028 101.305C24.136 102.942 26.3335 104.41 28.6019 105.707L29.3805 104.345C27.1757 103.084 25.0395 101.658 22.9901 100.066L22.028 101.305ZM31.3949 107.201C33.7724 108.387 36.2161 109.396 38.706 110.226L39.2021 108.738C36.7816 107.931 34.4062 106.951 32.0954 105.798L31.3949 107.201ZM41.7376 111.143C44.2923 111.838 46.8862 112.35 49.4987 112.679L49.695 111.123C47.1549 110.803 44.6329 110.305 42.1492 109.629L41.7376 111.143ZM52.6504 112.988C55.284 113.172 57.9281 113.172 60.5617 112.988L60.4525 111.423C57.8916 111.602 55.3205 111.602 52.7596 111.423L52.6504 112.988ZM63.7134 112.679C66.3259 112.35 68.9198 111.838 71.4745 111.143L71.0629 109.629C68.5792 110.305 66.0573 110.803 63.5171 111.123L63.7134 112.679ZM74.5061 110.226C76.996 109.396 79.4397 108.387 81.8172 107.201L81.1167 105.798C78.8059 106.951 76.4305 107.931 74.01 108.738L74.5061 110.226ZM84.6102 105.707C86.8786 104.41 89.0761 102.942 91.1841 101.305L90.222 100.066C88.1726 101.658 86.0364 103.084 83.8316 104.345L84.6102 105.707ZM93.6298 99.2934C94.6188 98.4325 95.5848 97.5316 96.5258 96.5906L95.4168 95.4816C94.5014 96.397 93.5618 97.2732 92.6001 98.1103L93.6298 99.2934ZM96.5258 96.5906L100.041 93.0759L98.9315 91.9668L95.4168 95.4816L96.5258 96.5906ZM102.852 90.2641L106.367 86.7493L105.258 85.6403L101.743 89.155L102.852 90.2641ZM106.367 86.7493L108.125 84.9919L107.015 83.8829L105.258 85.6403L106.367 86.7493Z" fill="#CECFD1"/>
  <rect x="113.676" y="50.6639" width="21.0845" height="38.7262" transform="rotate(-45 113.676 50.6639)" stroke="#090E1B"/>
  <rect x="141.166" y="69.1014" width="8.28167" height="1.38028" rx="0.690139" transform="rotate(-45 141.166 69.1014)" stroke="#56791D"/>
  <rect x="123.58" y="48.3762" width="2.76056" height="2.76056" rx="1.38028" transform="rotate(-45 123.58 48.3762)" stroke="#56791D"/>
  </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}

function Kibla() {
  const t = useTranslation();
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState<number>(0);
  const [sub, setSub] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(true);

  const [direction, setDirection] = useState<number>(0);
  const { top } = useSafeAreaInsets();

  const find_angle = (x: number[], y: number[]): number => {
    const d = (degrees: number) => degrees * (Math.PI / 180);
    const r = (radians: number) => radians * (180 / Math.PI);

    const x0 = d(x[0]);
    const y0 = d(y[0]);

    const difL = d(Math.abs(y[1] - x[1]));
    const a = Math.cos(y0) * Math.sin(difL);
    const b =
      Math.cos(x0) * Math.sin(y0) -
      Math.sin(x0) * Math.cos(y0) * Math.cos(difL);
    return r(Math.atan2(a, b));
  };

  const request = async () => {
    setLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== Location.PermissionStatus.GRANTED) {
      setLoading(false);
      setError(true);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const point1 = [location.coords.latitude, location.coords.longitude];
    const point2 = [21.422528, 39.826191];

    const dir = find_angle(point1, point2);
    setDirection(dir);

    setError(false);
    setLoading(false);

    _toggle();
    return () => {
      _unsubscribe();
    };
  };

  useEffect(() => {
    (async () => request())();
  }, []);

  const _fast = () => {
    Magnetometer.setUpdateInterval(60);
  };

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      LPF.init([]);
      LPF.smoothing = 0.4;
      _fast();
      _subscribe();
    }
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    sub && sub.remove();
    setSubscription(null);
    setSub(null);
  };

  const _angle = (magnetometer: any) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      y = Math.round(y);
      x = Math.round(x);
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(LPF.next(angle));
  };

  const _degree = (magnetometer: number) =>
    magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data: any) => {
        setMagnetometer((meter: number) => {
          const angle = meter - _angle(data);
          if (Math.abs(angle) > 2) {
            return Math.floor(meter - angle / 3);
          }
          return meter;
        });
      })
    );

    setSub(
      DeviceMotion.addListener(({ rotation }: any) => {
        if (rotation?.beta > 0.4 || rotation?.beta < -0.4) {
          setHorizontal(true);
        } else {
          setHorizontal(false);
        }
      })
    );
  };

  const renderCompass = () => {
    const rotateAngle = 90 - magnetometer + direction;
    return (
      <>
        <MeccaSvg
          svgColor={
            _degree(magnetometer) >= 135 && _degree(magnetometer) <= 139
              ? "green"
              : ""
          }
        />
        <CompassSvg
          svgStyle={{ transform: [{ rotate: `${rotateAngle}deg` }] }}
        />
        <ViewBox style={styles.svg} />
        <ViewBox style={styles.svg}>
          <TextBox color="mainText" fontSize={24} fontFamily={Fonts.Bold}>
            {_degree(magnetometer)}°
          </TextBox>
        </ViewBox>
      </>
    );
  };

  const renderError = () => (
    <ViewBox marginBottom="xxxl" alignItems="center">
      <TextBox marginBottom="md">{t("allow-location-access")}</TextBox>
      <TextBox marginHorizontal="xxxl">
        {t("to-calculate-qibla-direction-allow-access-to-your-location.")}
      </TextBox>
      <TouchableOpacity onPress={() => request()}>
        <ViewBox paddingHorizontal="xxxl" marginTop="xxl" paddingVertical="xxl">
          <TextBox color="mainText" fontSize={20} fontFamily={Fonts.Medium}>
            {t("request-access")}
          </TextBox>
        </ViewBox>
      </TouchableOpacity>
    </ViewBox>
  );

  const renderInfo = () => (
    <ViewBox marginBottom="xxxxxl" flexDirection="column" alignItems="center">
      <RotatePhoneSvg />
      <TextBox
        marginTop="37"
        textAlign="center"
        fontWeight="bold"
        variant="2xlBold"
      >
        {t("calibrate-the-compass")}
      </TextBox>
      <ViewBox width={220}>
        <TextBox
          color="mainText"
          fontSize={14}
          marginTop="sm"
          textAlign="center"
        >
          {t("move-the-phone-in-qibla")}
        </TextBox>
      </ViewBox>
      <ViewBox
        marginTop="54"
        borderRadius="14"
        paddingHorizontal="54"
        paddingVertical="lg"
        backgroundColor="darkGreen"
      >
        <TouchableOpacity onPress={() => setInfo(!info)}>
          <TextBox color="white" fontSize={16} textAlign="center">
            {t("continue")}
          </TextBox>
        </TouchableOpacity>
      </ViewBox>
    </ViewBox>
  );

  const renderHorizontal = () => (
    <ViewBox marginBottom="xxxxl" marginHorizontal="xxxl">
      <TextBox marginBottom="xxl" color="mainText" fontSize={24}>
        {t("position-the-phone-well")}
      </TextBox>
      <TextBox color="mainText" fontSize={24}>
        {t("hold-the-phone-horizontally")}
      </TextBox>
    </ViewBox>
  );

  const renderLoading = () => (
    <ViewBox alignItems="center" marginBottom="xxxxxl">
      <TextBox color="mainText" fontSize={22}>
        Loading...
      </TextBox>
    </ViewBox>
  );

  return (
    <ViewBox flex={1} backgroundColor="white" style={{paddingTop: top + 10}}>
      <TextBox
        fontSize={32}
        fontWeight="bold"
        marginHorizontal="xxxxxl"
        marginBottom="xl"
      >
        {t("qibla")}
      </TextBox>
      <ViewBox
        marginTop="9xl"
        alignItems="center"
        height="100%"
        paddingHorizontal="xxl"
      >
        {loading
          ? renderLoading()
          : info
          ? renderInfo()
          : error
          ? renderError()
          : horizontal
          ? renderHorizontal()
          : renderCompass()}
      </ViewBox>
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  list: {
    flexGrow: 0,
    marginBottom: 16,
  },
  bigList: {
    marginBottom: 24,
  },
  svg: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  arrow: {
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
});

export default Kibla;
