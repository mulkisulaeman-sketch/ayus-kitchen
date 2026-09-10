{{- define "ayus-kitchen.name" -}}{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}{{- end }}
{{- define "ayus-kitchen.fullname" -}}{{- if .Values.fullnameOverride }}{{ .Values.fullnameOverride }}{{- else }}{{ printf "%s-%s" .Release.Name (include "ayus-kitchen.name" .) | trunc 63 | trimSuffix "-" }}{{- end }}{{- end }}
{{- define "ayus-kitchen.labels" -}}app.kubernetes.io/name: {{ include "ayus-kitchen.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}{{- end }}
{{- define "ayus-kitchen.selectorLabels" -}}app.kubernetes.io/name: {{ include "ayus-kitchen.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}{{- end }}
