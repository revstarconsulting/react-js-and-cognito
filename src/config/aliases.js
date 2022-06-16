const aliases = (prefix = `src`) => ({
  "@auth": `${prefix}/navigation/Auth`,
  "@assets": `${prefix}/assets`,
  "@components": `${prefix}/components`,
  "@pages": `${prefix}/pages`,
  "@navigation": `${prefix}/navigation`,
  "@utils": `${prefix}/utils`,
  "@services": `${prefix}/services`,
  "@redux": `${prefix}/redux`,
  "@config": `${prefix}/config`,
});

module.exports = aliases;
