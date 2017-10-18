#!/bin/bash

function cloudapi1() {
  local now=`date -u "+%a, %d %h %Y %H:%M:%S GMT"`;
  echo "DATE:${now}"
  
  local filename="${PRIVATE_KEY}";
  local signature=`echo ${now} | tr -d '\n' | openssl dgst -sha256 -sign ${filename} | openssl enc -e -a | tr -d '\n'`;
  echo "SIGN: Signature keyId=\"/$SDC_ACCOUNT/keys/${SDC_USER}\",algorithm=\"rsa-sha256\" ${signature}" 
} 
cloudapi1
